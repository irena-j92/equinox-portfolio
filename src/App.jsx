import { useCallback, useEffect, useRef, useState } from "react";
import Navigation from "./components/Navigation.jsx";
import Hero from "./components/Hero.jsx";
import StoryIntro from "./components/StoryIntro.jsx";
import SelectedWork from "./components/SelectedWork.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";
import PortalStory from "./components/PortalStory.jsx";
import Practice from "./components/Practice.jsx";
import Contact from "./components/Contact.jsx";
import AboutPage from "./components/AboutPage.jsx";
import Footer from "./components/Footer.jsx";
import { useMotionPreference } from "./hooks/useMotionPreference.js";
import { useScrollReveal } from "./hooks/useScrollReveal.js";
import { projects } from "./data/portfolio.js";

function readRoute() {
  const hash = window.location.hash;
  return {
    page: /^#about(?:$|-)/.test(hash) ? "about" : "home",
    hash,
    project: hash.startsWith("#project/")
      ? projects.find((item) => item.id === hash.slice(9)) || null
      : null,
  };
}

export default function App() {
  const { motion, paused, setPaused, reduced } = useMotionPreference();
  const [route, setRoute] = useState(readRoute);
  const [navigationTick, setNavigationTick] = useState(0);
  const pageRef = useRef(route.page);
  const root = useRef(null);
  useScrollReveal(root, motion, route.page);
  useEffect(() => {
    const sync = () => {
      setRoute(readRoute());
      setNavigationTick((value) => value + 1);
    };
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("portfolio:navigate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("portfolio:navigate", sync);
    };
  }, []);
  useEffect(() => {
    document.title = route.project
      ? `${route.project.title} — Irena Jurisic`
      : route.page === "about"
        ? "About me — Irena Jurisic · Equinox"
        : "Equinox — Irena Jurisic · Design & Creative Development";
    if (route.project) return;
    const changedPage = pageRef.current !== route.page;
    pageRef.current = route.page;
    const frame = requestAnimationFrame(() => {
      const id = route.hash.slice(1) || "top";
      const target = document.getElementById(id);
      if (!target) return;
      window.scrollTo({
        top: Math.max(
          0,
          target.getBoundingClientRect().top +
            window.scrollY -
            (id === "top" || id === "about" ? 0 : 85),
        ),
        behavior: changedPage || !motion ? "instant" : "smooth",
      });
      if (changedPage) {
        const heading = target.querySelector("h1, h2");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route.page, route.hash, route.project, navigationTick]);
  const openProject = useCallback((next) => {
    window.history[
      window.location.hash.startsWith("#project/")
        ? "replaceState"
        : "pushState"
    ](null, "", `#project/${next.id}`);
    setRoute(readRoute());
  }, []);
  const closeProject = useCallback(() => {
    window.history.replaceState(null, "", "#work");
    setRoute(readRoute());
  }, []);
  return (
    <div
      ref={root}
      className={`portfolio-app ${motion ? "has-motion" : "motion-paused"}`}
    >
      <a
        className="skip-link"
        href={route.page === "about" ? "#about-content" : "#work"}
      >
        Skip to {route.page === "about" ? "my story" : "selected work"}
      </a>
      <Navigation page={route.page} />
      <main key={route.page} className="page-view">
        {route.page === "about" ? (
          <AboutPage />
        ) : (
          <>
            <Hero
              motion={motion}
              reduced={reduced}
              onToggleMotion={() => setPaused(!paused)}
            />
            <StoryIntro />
            <SelectedWork onOpen={openProject} motion={motion} />
            <PortalStory motion={motion} />
            <Practice motion={motion} />
            <Contact motion={motion} />
          </>
        )}
      </main>
      <Footer page={route.page} />
      <ProjectDetail
        project={route.project}
        onClose={closeProject}
        onNext={openProject}
        motion={motion}
      />
    </div>
  );
}
