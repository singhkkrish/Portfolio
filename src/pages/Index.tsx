import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MorphingBlobs from "@/components/MorphingBlobs";
import ParticleField from "@/components/ParticleField";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <CursorFollower />
      <MorphingBlobs />
      <ParticleField />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <WorkExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;