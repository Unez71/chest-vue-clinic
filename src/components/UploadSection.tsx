import { useState, useRef, useCallback } from "react";
import { Upload, X, FileImage, Loader2 } from "lucide-react";

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadSection = ({ onImageUpload, isAnalyzing }: UploadSectionProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Upload Chest X-Ray</h2>
          <p className="text-muted-foreground">
            Drag and drop your X-ray image or click to browse
          </p>
        </div>

        {!uploadedImage ? (
          <div
            className={`upload-zone p-12 rounded-3xl cursor-pointer relative overflow-hidden ${
              dragOver ? "drag-over" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <Upload className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-2">Choose X-Ray Image</h3>
              <p className="text-muted-foreground mb-4">
                Supports JPEG, PNG, and DICOM formats
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium">
                <FileImage className="h-5 w-5 mr-2" />
                Browse Files
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
        ) : (
          <div className="glass-card p-6 rounded-3xl">
            <div className="relative">
              <button
                onClick={clearImage}
                className="absolute top-4 right-4 z-10 p-2 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={uploadedImage}
                  alt="Uploaded X-ray"
                  className="w-full h-auto max-h-96 object-contain"
                />
                
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="scan-animation absolute inset-0 w-full h-2 top-1/2 transform -translate-y-1/2" />
                    <div className="glass-card p-4 rounded-xl">
                      <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                      <p className="text-sm font-medium">Analyzing X-ray...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-accent rounded-xl">
                <p className="text-sm text-accent-foreground">
                  <strong>Image uploaded successfully!</strong> AI analysis will begin automatically.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};