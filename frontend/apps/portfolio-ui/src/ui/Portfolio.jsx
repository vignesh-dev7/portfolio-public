import React, { useMemo, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import ResumeViewer from "./sections/ResumeViewer";
import BackToTop from "./BackToTop";
import { useAppContext } from "@common-ui/app-provider";
/* import Experience from "./sections/Experience";
import Education from "./sections/Education"; */

const sectionsOrder = ["about", "skills", "projects", "contact", "resumeViewer"];

export default function Portfolio() {
    const { section= 'about' } = useParams();
    const { accounts } = useAppContext();
    const theme = useTheme();
    const prevSectionRef = useRef(section);

    console.log(`accounts: ${JSON.stringify(accounts, 2, null)}`)
    // Detect navigation direction
    const direction = useMemo(() => {
        const prevIndex = sectionsOrder.indexOf(prevSectionRef.current);
        const currentIndex = sectionsOrder.indexOf(section);
        prevSectionRef.current = section;

        // true = forward (down), false = backward (up)
        return currentIndex > prevIndex ? "down" : "up";
    }, [section]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [section]);
    // Animation direction
    const variants = {
        initial: (dir) => ({
            opacity: 0,
            y: dir === "down" ? 60 : -60, // move from bottom if going down
            filter: "blur(12px)",
            scale: 0.98,
        }),
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0],
            },
        },
        exit: (dir) => ({
            opacity: 0,
            y: dir === "down" ? -60 : 60, // move upward when leaving
            filter: "blur(10px)",
            scale: 0.98,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
            }
        }),
    };

    const renderSection = () => {
        switch (section) {
            case "about":
                return <About about={accounts?.about} contact={accounts?.contact} socialLinks={accounts?.socialLinks}/>;
            case "skills":
                return <Skills skills={accounts?.skills}/>;
            case "projects":
                return <Projects projects={accounts?.projects}/>;
            case "contact":
                return <Contact contact={accounts?.contact} socialLinks={accounts?.socialLinks}/>;
            case "resumeViewer":
                return <ResumeViewer socialLinks={accounts?.socialLinks}/>;
            default:
                return <About />;
        }
    };

    return (
        <Box sx={{ transition: "background-color 0.3s ease, color 0.3s ease", color: theme.palette.text.primary, position: "relative", minHeight: "100%" }}>
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={section}
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        //position: "absolute",
                        width: "100%",
                        willChange: "transform, opacity, filter",
                    }}
                >
                    {renderSection()}
                </motion.div>
                <BackToTop /> 
            </AnimatePresence>
        </Box>
    );
}
