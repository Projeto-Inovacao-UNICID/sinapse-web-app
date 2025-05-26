import { FormDto } from "@/types";

export const mockForms: FormDto[] = [
    {
        "id": "1",
        "nome": "Autoavaliação de Hard Skills em Programação",
        "descricao": "Este formulário tem como objetivo entender seu nível de conhecimento técnico em áreas essenciais da programação.",
        "minScore": 75.0,
        "empresaId": "b072860d-c92b-4635-9f0c-e4cd777b0153",
        "fields": [
            {
                "id": "31bb1900-9ca2-4a06-bf32-ea69182242eb",
                "label": "Com qual linguagem de programação você tem mais familiaridade? Explique sua experiência com ela.",
                "fieldType": "TEXT",
                "weight": 2.0,
                "required": true,
                "category": "HARD_SKILL",
                "options": []
            },
            {
                "id": "3b59d891-9895-49d6-a200-bcc5e59d5ae7",
                "label": "Descreva um desafio técnico que você enfrentou recentemente e como resolveu.",
                "fieldType": "TEXT",
                "weight": 2.0,
                "required": false,
                "category": "HARD_SKILL",
                "options": []
            },
            {
                "id": "454f3210-b341-45f7-abcd-4cead32d05b9",
                "label": "Como você classificaria seu conhecimento sobre estruturas de dados (listas, árvores, grafos, etc)?",
                "fieldType": "SELECT",
                "weight": 3.0,
                "required": true,
                "category": "HARD_SKILL",
                "options": [
                    {
                        "id": "3892e304-fae0-4311-847a-2acab5762212",
                        "label": "Intermediário – entendo bem os principais conceitos",
                        "value": "intermediate",
                        "score": 70.0
                    },
                    {
                        "id": "93497ded-7574-4c93-8c36-8411f3fd4d72",
                        "label": "Básico – tenho contato superficial ou apenas teórico",
                        "value": "basic",
                        "score": 40.0
                    },
                    {
                        "id": "9add9d43-10b8-4a1f-a427-6eb45b31a1e6",
                        "label": "Avançado – uso com naturalidade em projetos e algoritmos",
                        "value": "advanced",
                        "score": 100.0
                    }
                ]
            },
            {
                "id": "7eefc7a6-42b7-4231-a253-51bc846052ae",
                "label": "De 0 a 10, como você avalia sua habilidade de resolver problemas com lógica de programação?",
                "fieldType": "NUMBER",
                "weight": 3.0,
                "required": true,
                "category": "HARD_SKILL",
                "options": []
            },
            {
                "id": "c199abac-0258-4b11-bf82-92568a4f5af5",
                "label": "Qual seu nível de experiência com controle de versão (ex: Git)?",
                "fieldType": "SELECT",
                "weight": 2.0,
                "required": true,
                "category": "HARD_SKILL",
                "options": [
                    {
                        "id": "b06871e2-cb8f-4b6c-a31e-cdf71feaa93c",
                        "label": "Conhecimento mínimo ou nunca utilizei",
                        "value": "basic",
                        "score": 30.0
                    },
                    {
                        "id": "c81f7a01-49c7-4a26-ac12-edd784906457",
                        "label": "Utilizo frequentemente em projetos colaborativos com branches, pull requests e rebase",
                        "value": "advanced",
                        "score": 100.0
                    },
                    {
                        "id": "e4c871f8-023e-4cee-873a-84e2f6300f01",
                        "label": "Uso em projetos pessoais e conheço comandos básicos (commit, push, pull)",
                        "value": "intermediate",
                        "score": 70.0
                    }
                ]
            }
        ]
    },  
    {
        "id": "2",
        "nome": "Autoavaliação de Soft Skills",
        "descricao": "Responda às perguntas abaixo para avaliarmos suas competências comportamentais. Seja sincero e reflita sobre suas experiências.",
        "minScore": 70.0,
        "empresaId": "b072860d-c92b-4635-9f0c-e4cd777b0153",
        "fields": [
            {
                "id": "589534ad-4e24-4540-9dc8-277dd7af99d4",
                "label": "Qual das opções melhor descreve seu estilo de liderança?",
                "fieldType": "SELECT",
                "weight": 3.0,
                "required": false,
                "category": "SOFT_SKILL",
                "options": [
                    {
                        "id": "074d1c2b-aa27-4f66-8b6f-72f2a0e42486",
                        "label": "Tomo decisões firmes e centralizadas quando necessário",
                        "value": "authoritative",
                        "score": 50.0
                    },
                    {
                        "id": "198c308c-66ab-4367-b17e-7a0728beb170",
                        "label": "Prefiro liderar de forma colaborativa, ouvindo e envolvendo o time",
                        "value": "collaborative",
                        "score": 90.0
                    },
                    {
                        "id": "1c973edd-5987-4279-af14-9a3b046c8549",
                        "label": "Evito assumir o papel de liderança",
                        "value": "avoidant",
                        "score": 30.0
                    }
                ]
            },
            {
                "id": "67100293-db35-46fd-8b78-6952b7041cdb",
                "label": "Descreva uma situação em que você precisou lidar com um conflito em equipe. Como agiu?",
                "fieldType": "TEXT",
                "weight": 2.0,
                "required": true,
                "category": "SOFT_SKILL",
                "options": []
            },
            {
                "id": "a21d2da8-e542-4b82-bf8c-b8da86072121",
                "label": "De 0 a 10, como você avalia sua capacidade de se comunicar com clareza?",
                "fieldType": "NUMBER",
                "weight": 2.0,
                "required": true,
                "category": "SOFT_SKILL",
                "options": []
            },
            {
                "id": "ed5f849a-60fd-4191-bdc4-d32058e2ed0c",
                "label": "Como você avalia sua empatia ao lidar com colegas de trabalho?",
                "fieldType": "SELECT",
                "weight": 3.0,
                "required": true,
                "category": "SOFT_SKILL",
                "options": [
                    {
                        "id": "99d5f7ce-9d1a-4e7c-94ec-afe417fa407e",
                        "label": "Tenho alta empatia, sempre busco entender o outro",
                        "value": "high",
                        "score": 100.0
                    },
                    {
                        "id": "9d509af6-57cc-425b-b284-9d782df9250a",
                        "label": "Tenho empatia moderada, tento entender o outro na maioria das vezes",
                        "value": "medium",
                        "score": 70.0
                    },
                    {
                        "id": "b3098cd6-8149-431f-8a13-751cbb999827",
                        "label": "Tenho dificuldade em me colocar no lugar dos outros",
                        "value": "low",
                        "score": 40.0
                    }
                ]
            }
        ]
    }
]