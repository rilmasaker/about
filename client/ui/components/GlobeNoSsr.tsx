"use client";

import { forwardRef, useEffect, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";

type GlobeProps = Record<string, unknown>;

type Props = GlobeProps & {
  loadingAriaLabel: string;
};

type GlobeComponentType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<GlobeProps> & React.RefAttributes<GlobeMethods>
>;

/**
 * Client-only wrapper for react-globe.gl to avoid SSR issues in Next.js.
 * Dynamically imports the Globe component and renders a localized loading placeholder before it is ready.
 */
export const GlobeNoSsr = forwardRef<GlobeMethods, Props>(
  function GlobeNoSsr(props, ref) {
    const { loadingAriaLabel, ...globeProps } = props;

    const [GlobeComponent, setGlobeComponent] =
      useState<GlobeComponentType | null>(null);

    useEffect(() => {
      let isMounted = true;

      import("react-globe.gl").then((module) => {
        if (!isMounted) return;
        setGlobeComponent(
          () => module.default as unknown as GlobeComponentType,
        );
      });

      return () => {
        isMounted = false;
      };
    }, []);

    if (!GlobeComponent) {
      // @ts-expect-error - intentional
      return <div aria-label={loadingAriaLabel} className="h-full w-full" />;
    }

    return <GlobeComponent {...globeProps} ref={ref} />;
  },
);
