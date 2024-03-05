import React from "react";

type TProps = {
    svgRef: React.RefObject<SVGSVGElement>
}

const SvgMemorized = React.memo(({svgRef}: TProps) => {
    return <svg ref={svgRef}/>
})

export default SvgMemorized