import styled from "styled-components";
import { Outlet } from "react-router-dom";
import financebg from "../images/financebg.png"
import bgcolor from "../images/bgcolor.png"
import calendar from '../images/calendar.png'
import UnitEconomyApp from './UnitApp'
const Wrapper = styled.div`

    /* height: calc(100vh - 56px); */

    @media(min-width: 768px){
        /* background-color: #fff; */
        display: flex;
        /* flex-direction: column; */
        justify-content: flex-start;
        align-items: center;
        /* background-image: url(${bgcolor}); */
        background-repeat: no-repeat;
        background-position-y: 0;
        padding-bottom: 10px;
        width: 768px;
        min-height: 850px;
        /* margin-left: auto;
        margin-right: auto; */
        margin-left: 190px;
    }

    @media(min-width: 1200px){
        /* width: 1280px;
        background-image: url(${bgcolor}), url(${financebg}); */
        /* background-position-y: 0, 90%; */
    }
`;

const BalanceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 0;
    background: #F5F6FB;
    border-bottom-left-radius: 120px;

    @media(min-width: 768px){
        margin-bottom: 30px;
        margin-top: 0;
        gap: 0;
        flex-direction: row;
    }

    @media(min-width: 1200px){
        margin-bottom: 10px;
    }
`;

const Finances = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: calc(100vh - 376px);

    @media(min-width: 768px){
        align-items: flex-start;
        justify-content: center;
        height: auto;
    }
`;

const Container = styled.div`
    
    display: none;

    @media(min-width: 768px){
        display: block;
        width: 665px;
        height: 626px;
        background-color: #fff;
        box-shadow: 0px 10px 60px 0px #AAB2C533;
        border-radius: 30px;
    }

    @media(min-width: 1200px){
        width: 860px;
        height: 800px;
    }
`;

const DateWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #52555F;
    font-family: Roboto, sans-serif;
    font-weight: 900;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.5px;
    width: 100px;
    height: 44px;
    margin-top: 30px;

    @media(min-width: 768px){
        display: none;
    }
`;

export default function FinancePage(){
    const currentDate = new Date()
    const date = currentDate.getDate()
    const month = currentDate.getMonth() + 1 
    const year = currentDate.getFullYear()
    return(
        <Wrapper>
            <BalanceWrapper>
                <DateWrapper>
                    <img src={calendar} alt="date" />
                    <p>{`${date}.${month}.${year}`}</p>
                </DateWrapper>
            </BalanceWrapper>
            <Finances>
                <Container>
                <UnitEconomyApp/>
                    <Outlet />
                </Container>
            </Finances>
        </Wrapper>
    )
}