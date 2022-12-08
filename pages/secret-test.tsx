import styled from "@emotion/styled";
import React from "react";

enum BlockType {
  Question = "QUESTION",
  Answer = "ANSWER",
}

interface Block {
  type: BlockType;
  id: string;
  content: string;
  order: number;
  depth: number;
  parentId: string | null;
  childrenIds: string[];
}

interface NormalizedBlock {
  [blockId: string]: {
    type: BlockType;
    parentId: string | null;
    childrenIds: string[];
    content: string;
    order: number;
    depth: number;
  };
}

const TestPage = () => {
  const DummyBlock: Block[] = [
    {
      type: BlockType.Question,
      id: "question01",
      content: "큰질문1",
      order: 0,
      depth: 0,
      parentId: null,
      childrenIds: ["answer01", "answer02"],
    },
    {
      type: BlockType.Answer,
      id: "answer01",
      content: "큰답변1",
      order: 100,
      depth: 1,
      parentId: "question01",
      childrenIds: ["tail-question01"],
    },
    {
      type: BlockType.Answer,
      id: "answer02",
      content: "큰답변2",
      order: 200,
      depth: 1,
      parentId: "question01",
      childrenIds: [],
    },
    {
      type: BlockType.Question,
      id: "tail-question01",
      content: "꼬리질문1",
      order: 300,
      depth: 2,
      parentId: "answer01",
      childrenIds: ["tail-answer01"],
    },
    {
      type: BlockType.Answer,
      id: "tail-answer01",
      content: "꼬리답변1",
      order: 400,
      depth: 3,
      parentId: "tail-question01",
      childrenIds: [],
    },
    {
      type: BlockType.Answer,
      id: "tail-answer02",
      content: "꼬리답변2",
      order: 500,
      depth: 3,
      parentId: "tail-question01",
      childrenIds: [],
    },
  ];
  const [blockState, setBlockState] = React.useState<NormalizedBlock | null>(null);

  React.useEffect(() => {
    const normalizedBlock: NormalizedBlock = {};

    DummyBlock.map((block) => {
      normalizedBlock[block.id] = {
        parentId: block.parentId,
        childrenIds: block.childrenIds,
        content: block.content,
        order: block.order,
        depth: block.depth,
        type: block.type,
      };
    });

    setBlockState(normalizedBlock);
  }, []);

  return (
    <main>
      {blockState &&
        Object.keys(blockState).map((blockId) => {
          const block = blockState[blockId];

          return (
            <Input
              key={blockId}
              value={block.content}
              onChange={(e) =>
                setBlockState((current) => {
                  const result = { ...current };

                  result[blockId] = {
                    parentId: block.parentId,
                    childrenIds: block.childrenIds,
                    content: e.target.value,
                    order: block.order,
                    depth: block.depth,
                    type: block.type,
                  };

                  return result;
                })
              }
              // 자신의 형제를 추가하는 경우라고 가정
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setBlockState((current) => {
                    const result = { ...current };

                    if (block.parentId) {
                      // 새로 추가되는 아이의 order를 어떻게 찾을 것인가 - 클라에서 고민안해도 되나?
                      const siblings = result[block.parentId].childrenIds;
                      const myIndex = siblings.findIndex((sibling) => sibling === blockId);
                      const nextSiblingIndex = siblings[myIndex + 1];
                      const nextSibling = result[nextSiblingIndex] || null;

                      result["new-id"] = {
                        parentId: block.parentId,
                        childrenIds: [],
                        content: "",
                        order: nextSibling ? (nextSibling.order - block.order) / 2 : block.order + 100,
                        depth: block.depth,
                        type: block.type,
                      };
                      result[block.parentId] = {
                        ...result[block.parentId],
                        childrenIds: [...result[block.parentId].childrenIds, "new-id"],
                      };
                    }

                    return result;
                  });
                }
              }}
            />
          );
        })}
    </main>
  );
};

export default TestPage;

const Input = styled.input`
  border: 1rem solid black;
`;
