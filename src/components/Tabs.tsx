import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components/macro"
import { ITabs, state } from "./types"

type Span = { bottom: number | undefined }
type Ref = HTMLButtonElement | undefined

const bottomBorder = ({ bottom }: Span) => bottom ? `width:${bottom *2  }px;` : 'width:100%;'
const Span = styled.div<Span>`
    height: 2px;
   ${bottomBorder}
    border-radius: 30px;
    background-color:#f20a45;
    box-shadow: 0px 0px 6px 0px #f20a45;
    margin: 5px;
`
const Container = styled.div`
   padding-top:10px;
   position: relative;
   left:50%;
`
export const Tabs = React.forwardRef<Ref, ITabs>((props, ref) => {
   const { children } = props
   const [tabMeta, setTabMeta] = useState<state>()
   const tabsRef = useRef<HTMLDivElement>(null)
   let bound;
   useEffect(() => {

      const tab = React.Children.map(children, (child) => {
         const node = tabsRef.current;
         bound = node?.getBoundingClientRect()
         setTabMeta(bound)
      })
   }, [tabsRef])
   return <Container ref={tabsRef}> <Span bottom={tabMeta?.bottom}></Span> {children}   </Container>
})