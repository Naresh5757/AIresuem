import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Lightbulb, FileCode } from 'lucide-react';

const AnalysisResult = ({ data }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const scoreColor = data.score >= 8 ? 'text-green-500' : data.score >= 5 ? 'text-yellow-500' : 'text-red-500';
    const scoreBorder = data.score >= 8 ? 'border-green-500' : data.score >= 5 ? 'border-yellow-500' : 'border-red-500';

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto mt-12 space-y-6"
        >
            {/* Score and Summary */}
            <motion.div variants={item} className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
                    <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Overall Score</h3>
                    <div className={`w-32 h-32 rounded-full border-4 ${scoreBorder} flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                        <span className={`text-4xl font-bold ${scoreColor}`}>{data.score}</span>
                        <span className="text-gray-500 text-sm ml-1">/10</span>
                    </div>
                    <p className="text-xs text-gray-500">Based on industry standards</p>
                </div>

                <div className="md:col-span-2 glass-card p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        Professional Summary
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{data.summary}</p>
                </div>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={item} className="glass-card p-6 border-l-4 border-l-green-500/50">
                    <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center gap-2">
                        <CheckCircle size={20} /> Key Strengths
                    </h3>
                    <ul className="space-y-2">
                        {data.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 bg-green-500/5 p-2 rounded">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                                {s}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div variants={item} className="glass-card p-6 border-l-4 border-l-red-500/50">
                    <h3 className="text-lg font-semibold mb-4 text-red-400 flex items-center gap-2">
                        <XCircle size={20} /> Missing / Weak Skills
                    </h3>
                    <ul className="space-y-2">
                        {data.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 bg-red-500/5 p-2 rounded">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                                {w}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Improvements and Formatting */}
            <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={item} className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
                        <AlertCircle size={20} /> Suggested Improvements
                    </h3>
                    <ul className="space-y-3">
                        {data.improvements.map((imp, i) => (
                            <li key={i} className="text-gray-300 text-sm border-b border-white/5 pb-2 last:border-0">
                                {imp}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div variants={item} className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-purple-400 flex items-center gap-2">
                        <FileCode size={20} /> Formatting Feedback
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed p-3 bg-white/5 rounded-lg">
                        {data.formatting}
                    </p>
                </motion.div>
            </div>

            {/* Tips */}
            <motion.div variants={item} className="glass-card p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
                <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                    <Lightbulb size={20} className="text-yellow-400" /> Actionable Tips
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {data.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 bg-black/20 p-3 rounded-lg">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/30">
                                {i + 1}
                            </span>
                            <p className="text-sm text-gray-300">{tip}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AnalysisResult;
