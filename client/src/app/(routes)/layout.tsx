import { ReactNode } from "react";
import { Navigation } from "../../components/globals/Navigation";

export default function BlogLayout({ children }: {
  children:ReactNode
}) {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}