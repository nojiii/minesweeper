import { useState } from 'react';
import styles from './index.module.css';
import { v4 as uuidv4 } from 'uuid';
//useStateを減らす
//機能を全部入れる(リプレイ不要)
//初級～上級
//カスタムサイズ
//スマホ対応
//要件通りに作る
//計算値＝状態と計算値を加工して作る値
//状態：時間で変化し保存される値=>board
//状態はアプリを壊す
//計算値：=>blackPoint boardから生成できる

const Home = () => {
  //盤面の大きさ
  const boardHeight: number = 9;
  const boardWidth: number = 9;
  //ボムの個数
  const bombQuantity: number = 10;
  //方向
  const directions: number[][] = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
  // const [samplePos, setSamplePos] = useState(0);

  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //ユーザーの入力を保存する配列
  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]); //0=>何もないcell クリック=>1(変更不能) 右クリック=>2,3(旗、？)
  //合成
  const [board, setBoard] = useState([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]);
  //ゲーム状況 0=未開始 1=進行中 2=終了 (予定)
  const [gameState, setGameState] = useState(0);

  //bombの個数を受け取りdisplayにreturnする
  const bombCounter = () => {
    let bombCount = bombQuantity;
    for (let i = 0; i < userInputs.length; i++) {
      for (let j = 0; j < userInputs[0].length; j++) {
        if (userInputs[i][j] === 2) {
          bombCount -= 1;
        }
      }
    }
    const result: React.JSX.Element[] = [
      <img src={`/images/d0.svg`} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={`/images/d0.svg`} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={`/images/d0.svg`} style={{ height: '100%' }} key={uuidv4()} />,
    ];
    const nums: string[] = String(bombCount).split('');
    nums.forEach((num) => {
      result.push(<img src={`/images/d${num}.svg`} style={{ height: '100%' }} key={uuidv4()} />);
      result.shift();
    });
    return result;
  };

  //displayに表示されるボムの個数
  const [bombCount, setbombCount] = useState(bombCounter());

  // for (let y = 0; y < boardHeight; y++) {
  //   for (let x = 0; x < boardWidth; x++) {
  //     board.push(); // 0-8数字 9爆弾 10赤い爆弾 11
  //   }
  // }
  //tsx board.map
  // console.log(samplePos);

  //   //再帰関数 0連鎖
  //   const fn = (hikisuu) => {
  //     if() {
  // //0が続く限り開く
  //     }else {
  //       fn();
  //     }
  //     return;
  //   };
  //Reactの副作用
  //useStateや計算値をもとに=>tsx->DOM(ブラウザ)
  //UI = f(state)  Home(useState)

  //useEffect 副作用を隔離する クリーンナップ 時計
  //1s毎に再描画

  //ゲーム開始時にbombmapを生成する関数(x, y, ^bombQuantity ^boardHeight ^boardWidth)
  const createBombMap = (x: number, y: number): number[][] => {
    const newBombMap: number[][] = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    for (let i = 0; i < bombQuantity; i++) {
      let putBomb: boolean = false;
      while (!putBomb) {
        const randY: number = Math.floor(Math.random() * boardHeight);
        const randX: number = Math.floor(Math.random() * boardWidth);
        if (randX !== x && randY !== y && newBombMap[randY][randX] !== 1) {
          newBombMap[randY][randX] = 1;
          putBomb = true;
        }
      }
    }
    return newBombMap;
  };

  //x,y座標を受け取りその座標の周り3~8マスの爆弾の数を返す関数(x, y bombMap ^directions)
  const checkBombAround = (x: number, y: number, bombMap: number[][]): number => {
    if (bombMap[y][x] === 1) {
      return 11;
    }
    let count = 0;
    directions.forEach((direction) => {
      if (
        -1 < x + direction[0] &&
        x + direction[0] < bombMap[0].length &&
        -1 < y + direction[1] &&
        y + direction[1] < bombMap.length &&
        bombMap[y + direction[1]][x + direction[0]] === 1
      ) {
        count++;
      }
    });
    return count;
  };

  // //x,y座標を受け取りその座標のboardの状態を変える(x, y, ^board bombMap ^directions)
  const cellOpen = (x: number, y: number, bombMap: number[][]) => {
    const newBoard = board.concat();
    console.log('<-- now in cellOpen() -->');
    console.log('cellOpen() recieve x:', x, 'y:', y);
    console.log('cellOpen() recieve bombmap:', bombMap);
    //x,yがボムだった時

    if (bombMap[y][x] === 1) {
      newBoard[y][x] = 11;
    } else {
      //x,yの周りにボムが一つもなかった時
      if (checkBombAround(x, y, bombMap) <= 0) {
        newBoard[y][x] = checkBombAround(x, y, bombMap);
        directions.forEach((direction) => {
          if (
            -1 < x + direction[0] &&
            x + direction[0] < bombMap[0].length &&
            -1 < y + direction[1] &&
            y + direction[1] < bombMap.length &&
            newBoard[y + direction[1]][x + direction[0]] === -1
          ) {
            newBoard[y + direction[1]][x + direction[0]] = checkBombAround(
              x + direction[0],
              y + direction[1],
              bombMap,
            );
            cellOpen(x + direction[0], y + direction[1], bombMap);
          }
        });
        //x,yの周りにボムがあったとき
      } else {
        newBoard[y][x] = checkBombAround(x, y, bombMap);
      }
    }
    setBoard(newBoard);
    console.log('<-- end of cellOpen() -->');
  };

  const gameReset = () => {
    const newBoard = [
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];
    setBoard(newBoard);
    setGameState(0);
  };

  const clickHandler = (x: number, y: number) => {
    //クリックした座標をconsoleに表示
    console.log('クリックした座標', x, y);
    //BombMapの生成&GameStateを進行中に設定
    let newBombMap: number[][] = [];
    if (gameState === 0) {
      newBombMap = createBombMap(x, y);
      setBombMap(newBombMap);
      setGameState(1);

      //cellを開く
      cellOpen(x, y, newBombMap);
    } else {
      //cellを開く
      cellOpen(x, y, bombMap);
    }

    console.log('現在のboard', board);
    console.log('ボムの位置のmap', bombMap);
    console.log('クリックした座標の周りのボムの数', checkBombAround(x, y, bombMap));
  };
  return (
    <div className={styles.container}>
      <div className={styles.outer}>
        <div className={styles.info}>
          <div className={styles.display}>
            <div className={styles.bombDisplay}>{bombCount}</div>
          </div>
          <div className={styles.faceButton} onClick={() => gameReset()} />
          <div className={styles.display}>
            <div className={styles.timeDisplay} />
          </div>
        </div>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cellType, x) => {
              if (cellType === -1) {
                return (
                  <div
                    className={styles.cell}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                  />
                );
              } else if (cellType === 0) {
                return (
                  <div
                    className={styles.open}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                  />
                );
              } else {
                return (
                  <div
                    className={styles.spCell}
                    style={{
                      backgroundPosition: `${(board[y][x] - 1) * -7.53}vh 0px`,
                    }}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                  />
                );
              }
            }),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
