import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Code2 } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "On-Site | Aug 2024–Present",
      title: "Full Stack Developer",
      subtitle: "Bhushan Enterprises",
      description:
        "Develop and maintain responsive web applications using React, Node.js, and Express.js. Integrate REST APIs, manage PostgreSQL and MongoDB databases, and support deployment, debugging, and performance optimization.",
      icon: <Code2 className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "Remote | Jan 2024–Jun 2024",
      title: "Frontend Developer Intern",
      subtitle: "Purezza Technologies",
      description:
        "Build responsive interfaces using React, HTML, CSS, JavaScript, and Tailwind CSS. Create reusable UI components and interactive layouts, and integrate REST APIs to improve functionality and user experience.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="An evolving path of leadership, innovation, and impact"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
