import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

const Hero = () => {
    return (
        <section className="flex flex-col items-center text-center py-12 md:py-20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-300"
            >
                <FileText size={16} />
                <span>Professional Resume Analysis</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-6 max-w-4xl mx-auto tracking-tight"
            >
                Optimize Your Resume for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                    Career Success
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
                Get instant, AI-powered feedback on your resume. Uncover your key strengths, identify missing skills, and get a professional score to beat the ATS.
            </motion.p>
        </section>
    );
};

export default Hero;
