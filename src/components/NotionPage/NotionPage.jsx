import React from "react";
import styled from "styled-components";

const templates = [
  {
    id: 1,
    title: "Шаблон 1",
    description: "Для планування контенту в соцмережах",
    link: "https://hannahwitton.notion.site/b69dab1ee9574910b9cc609f5f1fd96c?v=4ffcf351336548608ed1528d5bf0e91e",
  },
  {
    id: 2,
    title: "Шаблон 2",
    description: "Шаблон для товарного бізнесу",
    link: "https://azuab.notion.site/eCommerce-Dashboard-c037b50c86aa432d8942c6bd2d92dd40",
  },
  {
    id: 3,
    title: "Шаблон 3",
    description: "Для організації своєї роботи",
    link: "https://top-workspace.notion.site/My-Workspace-297f98ea60e842b7b4dcbbcdaa56388b",
  },
  {
    id: 4,
    title: "Шаблон 4",
    description: "Для планування днів тижня",
    link: "https://lowly-haumea-fcb.notion.site/Daily-Weekly-To-Do-Lists-a82d884f5e2e470daed7b85303d4e36f",
  },
  {
    id: 5,
    title: "Шаблон 5",
    description: "Для відстеження та управління проектами",
    link: "https://notion.notion.site/Anthropic-s-project-planner-379afb2da03444ba880dc3fbca9b09af",
  },
];

const App = () => {
  return (
    <AppContainer>
      <Header>
        {/* <h1>Notion Templates</h1> */}
      </Header>
      <TemplateContainer>
        {templates.map((template) => (
          <TemplateCard key={template.id}>
            <h2>{template.title}</h2>
            <p>{template.description}</p>
            <a href={template.link} target="_blank" rel="noopener noreferrer">
              Переглянути шаблон
            </a>
          </TemplateCard>
        ))}
      </TemplateContainer>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  /* background: linear-gradient(135deg, #e3f2fd, #bbdefb); */
  background-color: #6c7af4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  h1 {
    font-size: 3rem;
    margin: 20px 0;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
  }

  p {
    font-size: 1.4rem;
    color: #fff;
    margin-bottom: 40px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const TemplateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

const TemplateCard = styled.div`
  background: #ffffff;
  border: none;
  border-radius: 12px;
  width: 270px;
  padding: 25px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: #2d00f7;
    font-weight: bold;
  }

  p {
    font-size: 1.1rem;
    color: #455a64;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  a {
    display: inline-block;
    background-color: #545ed6;
    color: white;
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      /* background-color: #01579b; */
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;
