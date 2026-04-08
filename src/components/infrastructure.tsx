"use client";

import React from "react";
import { motion } from "framer-motion";

interface InfrastructureProps {
    title?: string;
    description?: string;
    accentColor?: string;
}

const features = [
    {
        label: "Laboratory",
        heading: "State-of-the-Art\nLabs",
        sub: "Cutting-edge computer labs equipped with the latest hardware and software, empowering students to experiment, innovate, and build the technology of tomorrow.",
        img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
        color: "rgba(59, 130, 246, 0.5)",
    },
    {
        label: "Library",
        heading: "Knowledge\nArchive",
        sub: "Our extensive library houses thousands of volumes, digital resources, and quiet study spaces designed to fuel intellectual curiosity and deep research.",
        img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
        color: "rgba(168, 85, 247, 0.5)",
    },
    {
        label: "Classroom",
        heading: "Smart\nClassrooms",
        sub: "Interactive smart classrooms with modern teaching aids, projectors, and collaborative seating that transform traditional lectures into engaging learning experiences.",
        img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
        color: "rgba(16, 185, 129, 0.5)",
    },
    {
        label: "Auditorium",
        heading: "The Grand\nAuditorium",
        sub: "A 500-seat auditorium with world-class acoustics and lighting, hosting everything from convocations to cultural events, seminars, and guest lectures.",
        img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        color: "rgba(244, 63, 94, 0.5)",
    },
];

export const Infrastructure: React.FC<InfrastructureProps> = ({
    title = "Explore Our Infrastructure",
    description = "World-class facilities designed to empower learning, innovation, and growth at every step of your journey.",
    accentColor = "#6366f1",
}) => {
    return (
        <div className="min-h-screen py-24 px-4 md:px-12 font-sans bg-white">
            <div className="max-w-5xl mx-auto mb-24 text-center">
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: accentColor }}>
                    Infrastructure — Campus Facilities
                </p>
                <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight leading-tight mb-4">
                    {title}
                </h2>
                <p className="text-neutral-400 text-lg max-w-xl mx-auto">{description}</p>
            </div>

            <div className="max-w-5xl mx-auto space-y-32">
                {features.map((feat, i) => (
                    <div key={i} className="sticky top-24 min-h-[50vh] flex items-center justify-center py-10">
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0, y: 50 }}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ margin: "-10% 0px -10% 0px" }}
                            className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group"
                        >
                            <div className="absolute inset-0">
                                <img
                                    src={`${feat.img}?q=80&w=1200&auto=format&fit=crop`}
                                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                                    alt={feat.label}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            </div>

                            <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                                <span
                                    className="text-xs font-mono uppercase tracking-widest mb-4 px-3 py-1 rounded-full w-fit"
                                    style={{ backgroundColor: accentColor + "22", color: accentColor, border: `1px solid ${accentColor}44` }}
                                >
                                    {feat.label}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-tight whitespace-pre-line">
                                    {feat.heading}
                                </h2>
                                <p className="text-xl text-neutral-400 max-w-lg">{feat.sub}</p>
                            </div>

                            <div className="absolute top-6 right-6 font-mono text-sm text-white/25">
                                0{i + 1} / 0{features.length}
                            </div>

                            <div
                                className="absolute -inset-20 blur-[100px] -z-10 opacity-30 rounded-full pointer-events-none"
                                style={{ backgroundColor: feat.color }}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};