import React, { memo } from "react";
import ScreenRoot from "../../screens/ScreenRoot";

function Body() {
  return (
    <section>
      <ScreenRoot></ScreenRoot>
    </section>
  );
}

export default memo(Body);
