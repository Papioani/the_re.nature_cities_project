"use client";
import React, { useRef, useEffect } from "react";

const ActionPage: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.focus({ preventScroll: true });
    }
  }, []);
  return (
    <section
      aria-labelledby="actionTitle"
      ref={mainContentRef}
      className="action-page-container px-6 py-8 max-w-4xl mx-auto"
    >
      <h2 id="actionTitle" className="text-center mb-8">
        Action Overview
      </h2>

      <div className="action-description text-left md:text-justify text-lg leading-relaxed p-6 shadow-lg rounded-lg bg-white">
        <p>
          The Action “Basic Research Financing (Horizontal support for all
          Sciences)” (ID 16618 - Subproject 1) is included in the projects of
          component 4.5 “Promote Research and Innovation” within the framework
          of the National Recovery and Resilience Plan “Greece 2.0” funded by
          the European Union - Next Generation EU and aims to contribute to the
          achievement of the general goals set by the National Recovery and
          Resilience Plan “Greece 2.0” (hereinafter “Greece 2.0”). Component 4.5
          “Promote Research and Innovation”, which includes the present Action,
          aims to increase public and private investments for research and
          development (R&amp;D), strengthen connections between science and
          businesses and develop innovative infrastructures for R&amp;D. This
          will be achieved through a series of projects, as well as reforms,
          aiming to motivate innovative businesses to invest in the R&amp;D
          sector. Sub-action 1, in which RE.Nature Cities Project is
          implemented, aims to finance projects with Principal Investigators
          (PI) who are newly appointed or are currently undergoing an
          appointment procedure for a non-permanent position (on a term basis)
          offered to Faculty Members, Researchers and Staff Research Scientists
          (ELE) in an Academic or Research Institution in Greece. Through this
          Sub-action, the beneficiaries shall have the opportunity to fund and
          implement their research ideas in all sciences, without any thematic
          or geographical restrictions, including in their team, for example,
          PhD candidates and/or postdoctoral researchers.
        </p>
      </div>
    </section>
  );
};

export default ActionPage;
