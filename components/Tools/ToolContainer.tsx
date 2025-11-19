import React, { useState } from 'react';
import { ToolType, User } from '../../types';
import { TOOLS } from '../../constants';
import * as GeminiService from '../../services/geminiService';

interface ToolContainerProps {
  toolId: ToolType;
  user: User;
  deductCredits: (amount: number) => void;
}

export const ToolContainer: React.FC<ToolContainerProps> = ({ toolId, user, deductCredits }) => {
  const tool = TOOLS.find(t => t.id === toolId);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!tool) return <div>Tool not found</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (user.credits < tool.cost) {
      setError("Insufficient credits. Please upgrade your plan.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput(null);

    try {
      let result = "";
      
      // --- LOGIC BRANCHING BASED ON TOOL ID ---
      
      // 1. Text to Image
      if (toolId === ToolType.TXT_IMG_TO_IMG) {
         if (!input) throw new Error("Please enter a prompt.");
         result = await GeminiService.generateImage(input, user.apiKey);
      }
      
      // 2. Text to Audio
      else if (toolId === ToolType.TXT_TO_AUDIO) {
         if (!input) throw new Error("Please enter text to convert.");
         result = await GeminiService.generateAudio(input, user.apiKey);
      }

      // 3. Audio to Text
      else if (toolId === ToolType.AUDIO_TO_TXT) {
          if (!file) throw new Error("Please upload an audio file.");
          const base64 = await GeminiService.fileToBase64(file);
          result = await GeminiService.transcribeAudio(base64, user.apiKey);
      }
      
      // 4. Icon Generator
      else if (toolId === ToolType.ICON_GEN) {
          if (!input) throw new Error("Describe the icon.");
          result = await GeminiService.generateIcon(input, user.apiKey);
      }
      
      // 5. Image to Video
      else if (toolId === ToolType.IMG_TO_VIDEO) {
          if (!file) throw new Error("Upload an image first.");
          const base64 = await GeminiService.fileToBase64(file);
          result = await GeminiService.generateVideoFromImage(base64, input, user.apiKey) || "";
      }

      // 6. Mock / Simulation for File Converters
      else if ([ToolType.PDF_TO_WORD, ToolType.WORD_TO_PDF, ToolType.PDF_EDIT, ToolType.WORD_EDIT].includes(toolId)) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
          result = "SUCCESS_FILE_CONVERSION"; 
      }
      
      // 7. Default Mock for others
      else {
          await new Promise(resolve => setTimeout(resolve, 2000));
          result = `Mock Success for ${tool.title}`;
      }

      setOutput(result);
      deductCredits(tool.cost);

    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="flex items-center space-x-4">
          <span className="text-4xl">{tool.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">{tool.title}</h2>
            <p className="text-slate-400">{tool.description}</p>
          </div>
          <div className="ml-auto bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-mono">
            Cost: {tool.cost} Credits
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            
            {/* Text Input */}
            {!([ToolType.AUDIO_TO_TXT].includes(toolId)) && (
                <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    {toolId === ToolType.TXT_IMG_TO_IMG ? "Prompt Description" : "Input Text / Instructions"}
                </label>
                <textarea 
                    className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Enter your creative prompt here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                </div>
            )}

            {/* File Input */}
            {(tool.category !== 'Utility' || toolId === ToolType.IMG_TO_VIDEO) && toolId !== ToolType.TXT_IMG_TO_IMG && toolId !== ToolType.TXT_TO_AUDIO && toolId !== ToolType.ICON_GEN && (
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Upload File</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors relative">
                        <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={handleFileChange}
                            accept={toolId.includes('PDF') ? '.pdf' : toolId.includes('WORD') ? '.doc,.docx' : toolId.includes('AUDIO') ? 'audio/*' : 'image/*'}
                        />
                        <div className="pointer-events-none">
                            <span className="text-2xl block mb-2">📂</span>
                            <p className="text-sm text-slate-400">{file ? file.name : "Drag & drop or click to upload"}</p>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all ${isLoading ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/25 hover:scale-[1.02]'}`}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Processing...</span>
                    </span>
                ) : (
                    "Generate Output"
                )}
            </button>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm">
                    {error}
                </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
           <div className={`glass-panel p-6 rounded-2xl h-full min-h-[400px] flex flex-col ${!output ? 'items-center justify-center' : ''}`}>
              {!output && !isLoading && (
                  <div className="text-center text-slate-500">
                      <span className="text-4xl mb-2 block opacity-20">⚡</span>
                      <p>Result will appear here</p>
                  </div>
              )}
              
              {isLoading && (
                   <div className="text-center text-slate-500 animate-pulse">
                      <p className="text-lg font-medium text-primary mb-2">AI is working...</p>
                      <p className="text-xs">This might take a few moments.</p>
                   </div>
              )}

              {output && (
                  <div className="w-full h-full flex flex-col animate-fade-in-up">
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Generated Output</h3>
                      
                      {/* Image Output */}
                      {(toolId === ToolType.TXT_IMG_TO_IMG || toolId === ToolType.ICON_GEN) && (
                          <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                              <img src={output} alt="Generated" className="w-full h-auto object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <a href={output} download="generated_image.jpg" className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">Download</a>
                              </div>
                          </div>
                      )}

                      {/* Audio Output */}
                      {toolId === ToolType.TXT_TO_AUDIO && (
                          <div className="bg-slate-900 p-6 rounded-xl border border-white/10 text-center">
                              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl animate-pulse">🔊</div>
                              <audio controls src={output} className="w-full" />
                              <a href={output} download="generated_audio.wav" className="mt-4 inline-block text-sm text-primary hover:underline">Download WAV</a>
                          </div>
                      )}

                       {/* Text Output */}
                       {toolId === ToolType.AUDIO_TO_TXT && (
                          <div className="flex-1 bg-slate-900/50 p-4 rounded-xl border border-white/10 overflow-y-auto font-mono text-sm leading-relaxed">
                              {output}
                          </div>
                      )}

                       {/* Video Link/Player */}
                       {toolId === ToolType.IMG_TO_VIDEO && (
                           <div className="bg-black rounded-xl overflow-hidden border border-white/10">
                               <video controls src={output} className="w-full h-auto" />
                           </div>
                       )}

                       {/* File Mock */}
                       {output === "SUCCESS_FILE_CONVERSION" && (
                           <div className="text-center py-12">
                               <div className="text-6xl mb-4">✅</div>
                               <h4 className="text-xl font-bold text-white mb-2">Conversion Complete</h4>
                               <p className="text-slate-400 mb-6">Your file is ready for download.</p>
                               <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-green-900/20">
                                   Download File
                               </button>
                           </div>
                       )}
                  </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};