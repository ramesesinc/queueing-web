// pages/index.js

import Bpls from "../components/groups/Bpls";
import General from "../components/groups/General";
import Rpt from "../components/groups/Rpt";
import Tc from "../components/groups/Tc";
import Accordion from "../components/ui/Accordion";
import AccordionItem from "../components/ui/AccordionItem";

export default function Home() {
  return (
    <>
      <Accordion>
        <AccordionItem title="BPLS">
          <Bpls title="Theme" />
        </AccordionItem>
        <AccordionItem title="RPT">
          <Rpt title="Theme" />
        </AccordionItem>
        <AccordionItem title="TC">
          <Tc title="Theme" />
        </AccordionItem>
        <AccordionItem title="GENERAL">
          <General title="Logo & Font Family" />
        </AccordionItem>
      </Accordion>
    </>
  );
}
