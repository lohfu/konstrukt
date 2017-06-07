import { $, $$ } from 'dollr'
import { select } from 'd3-selection'
import 'd3-transition'

// fetch('/img/lincoln.svg')
export default function konstrukt (image, element, options) {
  const promise = fetch(image)
    .then((res) => res.text())
    .then((text) => {
      const originalSvg = $(text)
      const paths = $$('path', originalSvg)
      const svg = select(element)
      paths.forEach((p, i) => {
        svg.append('path')
          .attr('style', p.getAttribute('style'))
          .attr('fill', p.getAttribute('fill'))
          .attr('stroke', p.getAttribute('fill'))
          .attr('stroke-width', 0.6)
          .attr('d', p.getAttribute('d'))
          .attr('transform', 'scale(0)')
      })
      return svg
    })

  return {
    construct () {
      if (this.constructed) return

      this.constructed = true

      promise.then((svg) => svg.selectAll('path')
        .transition()
        .duration(1000)

        .delay((d, i, a) => {
          return (2000 / a.length) * i
        })
        .attr('transform', 'scale(1)'))
    },

    destruct () {
      if (!this.constructed) return

      this.constructed = false

      promise.then((svg) => svg.selectAll('path')
        .transition()
        .duration(1000)
        .delay((d, i, a) => {
          return (2000 / a.length) * i
        })
        .attr('transform', 'scale(0)'))
    }
  }
}
