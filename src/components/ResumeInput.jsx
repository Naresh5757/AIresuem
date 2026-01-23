import { motion } from 'framer-motion';
import { Upload, Sparkles, Loader2, FileText, X } from 'lucide-react';
import { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Explicitly import the worker to ensure it works with Vite build
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const ResumeInput = ({ onAnalyze, isAnalyzing }) => {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [isReadingPdf, setIsReadingPdf] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = () => {
        if (!text.trim()) return;
        onAnalyze(text);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }

        setFileName(file.name);
        setIsReadingPdf(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join(' ');
                fullText += pageText + '\n\n';
            }

            setText(fullText);
        } catch (error) {
            console.error('Error reading PDF:', error);
            alert('Failed to read PDF file. Please try passing the text manually.');
            setFileName('');
        } finally {
            setIsReadingPdf(false);
            // Reset file input so same file can be selected again if needed
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const clearFile = () => {
        setText('');
        setFileName('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
        >
            <div className="glass-card p-6 md:p-8">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                    Paste your resume content or upload a PDF
                </label>

                <div className="relative mb-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="John Doe&#10;Software Engineer&#10;Summary..."
                        className="w-full h-64 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
                        disabled={isReadingPdf}
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
                        {text.length} characters
                    </div>

                    {isReadingPdf && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                            <div className="flex flex-col items-center gap-2 text-blue-400">
                                <Loader2 className="animate-spin" size={32} />
                                <span className="text-sm font-medium">Reading PDF...</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="application/pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                        />

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10"
                            disabled={isAnalyzing || isReadingPdf}
                        >
                            <Upload size={16} />
                            <span>{fileName ? 'Change PDF' : 'Upload PDF'}</span>
                        </button>

                        {fileName && (
                            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                                <FileText size={14} />
                                <span className="max-w-[150px] truncate">{fileName}</span>
                                <button onClick={clearFile} className="text-green-400/70 hover:text-green-400 ml-1">
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!text.trim() || isAnalyzing || isReadingPdf}
                        className={`btn btn-primary w-full md:w-auto ${(!text.trim() || isAnalyzing) && 'opacity-50 cursor-not-allowed'}`}
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Analyze Resume
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ResumeInput;
