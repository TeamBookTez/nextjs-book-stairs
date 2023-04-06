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
                        content: "질문 1",
                        children: [
                          {
                            id: "ㄹ",
                            type: "answer",
                            content: "1111111111111111111",
                            children: [],
                          },
                          {
                            id: "ㅁ",
                            type: "answer",
                            content: "2222222222222222222",
                            children: [],
                          },
                          {
                            id: "ㅂ",
                            type: "answer",
                            content: "333333333333333333",
                            children: [],
                          },
                          {
                            id: "ㅅ",
                            type: "answer",
                            content: "44444444444444444444",
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
