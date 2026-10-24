import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "./Navigation.jsx";

export default function StoryIntro() {
  return (
    <div className="story-intro section-pad" id="beginning">
      <div className="story-thread" aria-hidden="true">
        <span />
      </div>
      <p className="eyebrow" data-reveal>
        IT ALWAYS STARTS WITH A LITTLE “WHAT IF?”
      </p>
      <p className="story-manifesto" data-reveal>
        What if a website felt
        <br />
        less like a screen,
        <br />
        <span className="serif">and more like somewhere?</span>
      </p>
      <div className="story-intro-bottom" data-reveal>
        <p>
          That’s the question I follow. Through thoughtful design, expressive
          motion, and a willingness to see what happens when an idea meets code.
        </p>
        <a
          className="inline-link"
          href="#about"
          onClick={(e) => scrollToSection(e, "about")}
        >
          A little about me <ArrowUpRight size={16} />
        </a>
      </div>
      <span className="story-connector" aria-hidden="true" />
    </div>
  );
}
