import { rest } from "msw";

export const reivewHandler = [
  rest.get(`${process.env.NEXT_PUBLIC_BASE_URL}/review/:reviewId/peri`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: "독후감 중단계 조회 성공.",
        data: {
          answerThree: {
            type: "Root",
            content: "root",
            children: [
              {
                type: "question",
                content: "MSW :: sadfsd",
                children: [
                  {
                    type: "answer",
                    content: "asdsad",
                    children: [
                      {
                        type: "question",
                        content: "",
                        children: [
                          {
                            type: "answer",
                            content: "",
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "sadsa",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "\ndsadsadsad",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                ],
              },
              {
                type: "question",
                content: "asdasd",
                children: [
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                ],
              },
              {
                type: "question",
                content: "",
                children: [
                  {
                    type: "answer",
                    content: "",
                    children: [],
                  },
                ],
              },
            ],
          },
          reviewSt: 3,
          finishSt: false,
        },
      }),
    );
  }),
];
