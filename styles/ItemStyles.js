import styled from "styled-components";

const ItemStyles  = styled.div`
background: white;
border: 1px solid var(--offWhite);
box-shadow: var(--bs);
position: relative;
display: flex;
flex-direction: column;

img{
    width: 100%;
    height: 200px;
    //object-fit: cover;    enabling this property was stretching images and not showing them fully
    object-fit: scale-down;

}

p{
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
}

.buttonList{
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightgrey);
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    grid-gap: 1px;
    background: var(--lightgrey);
    & > * {
        background: white;
        border: 0;
        font-size: 1rem;
        padding: 1rem;
    }
}

`;

export default ItemStyles;