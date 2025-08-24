import React, { useState, type FC, type JSX } from 'react';
import './NimGameTree.css';

interface Move {
  newHeap1: number;
  newHeap2: number;
  description: string;
}

const NimGameTree: FC = () => {
  const [nodeVisibility, setNodeVisibility] = useState<{ [key: string]: boolean }>({});

  const toggleNode = (path: string) => {
    setNodeVisibility(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const getPossibleMoves = (heap1: number, heap2: number): Move[] => {
    const moves: Move[] = [];
    if (heap1 > 0) {
      for (let take = 1; take <= heap1; take++) {
        moves.push({ newHeap1: heap1 - take, newHeap2: heap2, description: `Take ${take} from heap 1` });
      }
    }
    if (heap2 > 0) {
      for (let take = 1; take <= heap2; take++) {
        moves.push({ newHeap1: heap1, newHeap2: heap2 - take, description: `Take ${take} from heap 2` });
      }
    }
    return moves;
  };

  const renderNode = (heap1: number, heap2: number, depth = 0, moveDescription = '', path = '0'): JSX.Element => {
    const isTerminal = heap1 === 0 && heap2 === 0;
    const player = depth % 2 === 0 ? 'MAX' : 'MIN';
    const moves = getPossibleMoves(heap1, heap2);
    const hasChildren = moves.length > 0;
    const isExpanded = !!nodeVisibility[path];
    const winner = isTerminal ? (depth % 2 === 1 ? 'MAX' : 'MIN') : null;

    return (
      <div className="nim-node-wrapper" key={path}>
        <div 
          className={`node-content ${player.toLowerCase()}-player ${isTerminal ? 'terminal' : ''}`}
          onClick={() => hasChildren && toggleNode(path)}
        >
          {moveDescription && <div className="move-tooltip">{moveDescription}</div>}
          <div className="node-state">({heap1}, {heap2})</div>
          {winner && <div className="winner">{winner} wins!</div>}
          {hasChildren && !isTerminal && <div className={`expand-indicator ${isExpanded ? 'expanded' : ''}`}></div>}
        </div>

        {isExpanded && hasChildren && (
          <div className="children">
            {moves.map((move, index) => (
              <div className="child-branch" key={index}>
                {renderNode(move.newHeap1, move.newHeap2, depth + 1, move.description, `${path}-${index}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="nim-game-tree">
      {renderNode(1, 2)}
    </div>
  );
};

export default NimGameTree;
