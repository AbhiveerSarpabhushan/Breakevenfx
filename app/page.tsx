import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutProgram from "@/components/AboutProgram";
import FounderStory from "@/components/FounderStory";
import Testimonials from "@/components/Testimonials";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutProgram />
        <FounderStory />
        <Testimonials />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
