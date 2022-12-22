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
            id: "루트",
            type: "Root",
            content: "root",
            children: [
              {
                id: "ㄱ",
                type: "question",
                content: "MSW :: sadfsd",
                children: [
                  {
                    id: "ㄴ",
                    type: "answer",
                    content: "asdsad",
                    children: [
                      {
                        id: "ㄷ",
                        type: "question",
                        content: "",
                        children: [
                          {
                            id: "ㄹ",
                            type: "answer",
                            content: "",
                            children: [],
                          },
                        ],
                      },
                    ],
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
