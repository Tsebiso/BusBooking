import styled from 'styled-components'

export const ImageSectionWrapp = styled.img`
  width: 100%;
`

export const SectionContainer = styled.div`
  width: 100%;
  min-height: 800px;
  padding: 1em;

  @media only screen and (min-width: 768px) {
    padding: 1em 4em;
  }

  @media only screen and (min-width: 992px) {
    padding: 2em 6em;
  }

  @media only screen and (min-width: 1200px) {
    padding: 2em 8em;
  }
`

export const OpeningText = styled.p`
  font-size: 20px;
  letter-spacing: 1px;
  margin: 1em 0;
  color: #FFFFFF;
`

export const SectionConatinerCards = styled.div`
  display: grid;
  align-items: center;
  gap: .5em 0;

  @media only screen and (min-width: 992) {
    max-width: 550px
  }
`

export const SectionRowCard = styled.div`
  background: #B2E4DB;
  cursor: pointer;
  display: block;
  top: 0px;
  position: relative;
  border-radius: 5px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  border: 1px solid #f2f8f9;
  transition: all .2s ease-out;

  &:hover {
    transition: all .2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #B2E4DB;
    background: #FFFFFF;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 2s ease-out;
  }

  &:hover:before {
    transform: scale(2.15);
    transition: all .2s ease-out;
  }
`
export const CardFlexItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`
export const BusName = styled.h5`
  color: #1B1517;
`

export const BusPrice = styled.h2`
  color: #01C38E;
`

export const BusDetailsWrapp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`

export const BusDetailsContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
  text-transform: capitalize;
`

export const ParagraphContent = styled.p`
  font-size: 16px;
  color: #B27567;
`

export const SpanContent = styled.span`
  text-decoration: none;
  font-style: normal;
`

export const BusTravelTimeWrapp = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
  margin-top: 1em;
  font-size: 14px;
`

export const BusTravel = styled.p`
  font-size: 14px;
`