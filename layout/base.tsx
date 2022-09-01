import Head from "next/head";
import { FC, PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description: string;
}

const BaseLayout: FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title ?? "Mercury"}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </>
  );
};

export default BaseLayout;
