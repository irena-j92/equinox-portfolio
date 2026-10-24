import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, X } from "lucide-react";
import gsap from "gsap";
import { profile } from "../data/portfolio.js";

const interests = [
  "A website",
  "A product",
  "Creative coding",
  "Something else",
];

export default function Contact({ motion }) {
  const [interest, setInterest] = useState("A website");
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const submitRef = useRef(null);
  const draftRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!prepared) return;
    const modal = draftRef.current;
    lastFocus.current = document.activeElement;
    modal.showModal();
    return () => {
      modal.close();
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [prepared]);
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = `Hello Irena,\n\n${String(form.get("message")).trim()}\n\nI'm interested in: ${interest}\n\n${String(form.get("name")).trim()}\n${String(form.get("email")).trim()}`;
    setCopied(false);
    setCopyFailed(false);
    setDraftOpened(false);
    setPrepared(text);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }
  function saveDraft() {
    const file = new Blob([prepared], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "message-for-irena.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function sendEmail() {
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Let's create — ${interest}`)}&body=${encodeURIComponent(prepared)}`;
    setDraftOpened(true);
  }
  function magnet(event) {
    if (!motion || event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    gsap.to(submitRef.current, {
      x: (event.clientX - box.left - box.width / 2) * 0.15,
      y: (event.clientY - box.top - box.height / 2) * 0.22,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }
  return (
    <section
      id="contact"
      className="contact section-pad"
      aria-labelledby="contact-title"
    >
      <div className="contact-landscape" aria-hidden="true" />
      <div className="section-topline" data-reveal>
        <span className="eyebrow">EVERY ENDING IS A POSSIBLE BEGINNING</span>
        <span className="eyebrow muted">YOUR TURN</span>
      </div>
      <div className="contact-layout">
        <div className="contact-heading" data-reveal>
          <span className="contact-asterisk" aria-hidden="true">
            ✳
          </span>
          <h2 id="contact-title">
            You’ve seen my world.
            <br />
            <span className="serif">What’s on your mind?</span>
          </h2>
          <p>
            A new idea. A question without an answer yet.
            <br />
            Something you can almost imagine.
            <br />
            Let’s follow it together.
          </p>
          <div className="contact-links">
            {profile.email && (
              <a href={`mailto:${profile.email}`}>
                Email <ArrowUpRight size={15} />
              </a>
            )}
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={15} />
            </a>
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              Elsewhere <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit} data-reveal>
          <div className="form-pair">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="How should I call you?"
                required
                maxLength={120}
              />
            </label>
            <label>
              Your email
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Somewhere I can say hello"
                required
                maxLength={254}
              />
            </label>
          </div>
          <fieldset className="interest-field">
            <legend>What’s on your mind?</legend>
            <div className="interest-options">
              {interests.map((item) => (
                <label
                  className={interest === item ? "is-selected" : ""}
                  key={item}
                >
                  <input
                    type="radio"
                    name="interest"
                    checked={interest === item}
                    onChange={() => setInterest(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="message-field">
            A little about your idea
            <textarea
              name="message"
              placeholder="This could be the beginning of something…"
              rows={3}
              required
              minLength={10}
              maxLength={4000}
            />
          </label>
          <div className="form-bottom">
            <p>
              {profile.email
                ? "Opens in your email app."
                : "Prepare a note to copy or save."}
              <br />A good starting point is all it takes.
            </p>
            <div
              className="submit-magnet"
              onPointerMove={magnet}
              onPointerLeave={() =>
                gsap.to(submitRef.current, {
                  x: 0,
                  y: 0,
                  duration: 0.6,
                  ease: "elastic.out(1,.5)",
                })
              }
            >
              <button className="submit-button" ref={submitRef} type="submit">
                <span>{profile.email ? "LET’S TALK" : "PREPARE MESSAGE"}</span>
                <ArrowUpRight size={24} strokeWidth={1} />
              </button>
            </div>
          </div>
        </form>
      </div>
      {prepared && (
        <dialog
          className="draft-dialog"
          ref={draftRef}
          aria-labelledby="draft-title"
          onCancel={(event) => {
            event.preventDefault();
            setPrepared("");
          }}
        >
          <div className="draft-top">
            <span className="eyebrow">A CONVERSATION IN THE MAKING</span>
            <button
              className="icon-button"
              aria-label="Close message preview"
              onClick={() => setPrepared("")}
            >
              <X size={22} />
            </button>
          </div>
          <h3 id="draft-title">Your note, ready to go.</h3>
          <p>
            {profile.email
              ? "Review your note, then open it in your email app."
              : "Your note is prepared. Email delivery will be available once Irena adds her contact address."}
          </p>
          <textarea
            className="prepared-message"
            aria-label="Prepared message"
            readOnly
            value={prepared}
          />
          <div className="draft-actions">
            <button className="pill-button" onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
              {copied ? "Copied" : "Copy message"}
            </button>
            <button
              className="pill-button"
              onClick={profile.email ? sendEmail : saveDraft}
            >
              {profile.email ? (
                <ArrowUpRight size={16} />
              ) : (
                <Download size={16} />
              )}{" "}
              {profile.email ? "Open email app" : "Save note"}
            </button>
          </div>
          <p className="form-status" role="status">
            {copyFailed
              ? "Copy is unavailable in this browser. Select the note above or use Save note."
              : draftOpened
                ? "Your email app was requested. Your message has not been sent by this website."
                : copied
                  ? "Copied to your clipboard. Nothing has been sent."
                  : "Nothing has been sent."}
          </p>
        </dialog>
      )}
    </section>
  );
}
