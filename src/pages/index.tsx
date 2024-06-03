import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { v4 as uuidv4 } from 'uuid';
// import Image from 'next/image';

import dH from '../assets/images/d-.svg';
import d0 from '../assets/images/d0.svg';
import d1 from '../assets/images/d1.svg';
import d2 from '../assets/images/d2.svg';
import d3 from '../assets/images/d3.svg';
import d4 from '../assets/images/d4.svg';
import d5 from '../assets/images/d5.svg';
import d6 from '../assets/images/d6.svg';
import d7 from '../assets/images/d7.svg';
import d8 from '../assets/images/d8.svg';
import d9 from '../assets/images/d9.svg';

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
  // const images = [
  //   '../assets/images/d0.svg',
  //   '../assets/images/d1.svg',
  //   '../assets/images/d2.svg',
  //   '../assets/images/d3.svg',
  //   '../assets/images/d4.svg',
  //   '../assets/images/d5.svg',
  //   '../assets/images/d6.svg',
  //   '../assets/images/d7.svg',
  //   '../assets/images/d8.svg',
  //   '../assets/images/d9.svg',
  //   '../assets/images/d-.svg',
  // ];

  // const PreloadImages = ({ imageUrls }) => {
  //   return (
  //     <div style={{ display: 'none' }}>
  //       {imageUrls.map((url, index) => (
  //         <div key={index} style={{ backgroundImage: `url(${url})` }} />
  //       ))}
  //     </div>
  //   );
  // };

  //盤面の大きさ
  const [boardHeight, setBoardHeight] = useState(9);
  const [boardWidth, setBoardWidth] = useState(9);
  //ボムの個数
  const [bombQuantity, setBombQuantity] = useState(10);
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

  //bombMap ボムの位置を保存する配列
  const initialBombMap = Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => 0),
  );
  const [bombMap, setBombMap] = useState<number[][]>(initialBombMap);

  //userInputs ユーザーの入力を保存する配列
  const initialUserInputs = Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => 0),
  );
  const [userInputs, setUserInputs] = useState<number[][]>(initialUserInputs);
  //0=>何もないcell クリック=>1(変更不能) 右クリック=>2,3(旗、？)
  //合成

  //board cellの状態を保存する配列
  const initialBoard = Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => -1),
  );
  const [board, setBoard] = useState<number[][]>(initialBoard);

  //ゲーム状況 0=未開始 1=進行中 2=勝利 3=敗北 (予定)
  const [gameState, setGameState] = useState(0);

  //カスタムゲームの設定画面の表示
  const [customGameState, setCustomGameState] = useState(false);

  //bombの個数を受け取りdisplayにreturnする
  const bombCounter = (userInputs: number[][], bombQuantity: number) => {
    let bombCount = bombQuantity;
    for (let i = 0; i < userInputs.length; i++) {
      for (let j = 0; j < userInputs[0].length; j++) {
        if (userInputs[i][j] === 2) {
          bombCount -= 1;
        }
      }
    }
    if (bombCount <= -99) {
      bombCount = -99;
    }
    const result: React.JSX.Element[] = [
      <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
    ];
    const ds: React.ImgHTMLAttributes<HTMLImageElement>[] = [
      d0,
      d1,
      d2,
      d3,
      d4,
      d5,
      d6,
      d7,
      d8,
      d9,
    ];
    const nums: string[] = String(bombCount).split('');
    nums.forEach((num) => {
      if (num === '-') {
        result.push(<img src={dH.src} style={{ height: '100%' }} key={uuidv4()} />);
      } else {
        result.push(<img src={ds[parseInt(num)].src} style={{ height: '100%' }} key={uuidv4()} />);
      }
      result.shift();
    });
    return result;
  };

  //displayに表示されるボムの個数
  const [bombCount, setbombCount] = useState(bombCounter(userInputs, bombQuantity));

  const timeCounter = (time: number) => {
    if (time >= 999) {
      return [
        <img src={d9.src} style={{ height: '100%' }} key={uuidv4()} />,
        <img src={d9.src} style={{ height: '100%' }} key={uuidv4()} />,
        <img src={d9.src} style={{ height: '100%' }} key={uuidv4()} />,
      ];
    }
    const result: React.JSX.Element[] = [
      <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
      <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
    ];
    const ds: React.ImgHTMLAttributes<HTMLImageElement>[] = [
      d0,
      d1,
      d2,
      d3,
      d4,
      d5,
      d6,
      d7,
      d8,
      d9,
    ];
    const nums: string[] = String(time).split('');
    nums.forEach((num) => {
      if (num === '-') {
        result.push(<img src={dH.src} style={{ height: '100%' }} key={uuidv4()} />);
      } else {
        result.push(<img src={ds[parseInt(num)].src} style={{ height: '100%' }} key={uuidv4()} />);
      }
      result.shift();
    });
    return result;
  };

  //タイマー系State
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      const id = setInterval(() => {
        setTime((prevTime) => {
          return prevTime + 1;
        });
      }, 1000);
      setIntervalId(id);
    } else if (isPaused && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // for (let y = 0; y < boardHeight; y++) {
  //   for (let x = 0; x < boardWidth; x++) {
  //     board.push(); // 0-8数字 11爆弾 10赤い爆弾   //   }
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
    const newBombMap: number[][] = Array.from({ length: boardHeight }, () =>
      Array.from({ length: boardWidth }, () => 0),
    );

    //bombの個数が要素数より多いとき
    let newBombQuantity = bombQuantity;
    if (bombQuantity >= boardWidth * boardHeight) {
      newBombQuantity = boardWidth * boardHeight;
      setBombQuantity(newBombQuantity);
      return Array.from({ length: boardHeight }, () => Array.from({ length: boardWidth }, () => 1));
    }
    for (let i = 0; i < newBombQuantity; i++) {
      let putBomb: boolean = false;
      while (!putBomb) {
        const randY: number = Math.floor(Math.random() * boardHeight);
        const randX: number = Math.floor(Math.random() * boardWidth);
        if (!(randX === x && randY === y) && newBombMap[randY][randX] !== 1) {
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

  // //x,y座標を受け取りその座標のboard,userInputsの状態を変える(x, y, ^board bombMap ^directions ^userInputs)
  const cellOpen = (x: number, y: number, bombMap: number[][]) => {
    //新しいboardとuserInputsを作成
    const newBoard = board.concat();
    const newUserInputs = userInputs.concat();

    //x,yがボムだった時
    if (bombMap[y][x] === 1 && userInputs[y][x] === 0) {
      newBoard[y][x] = 10;
      newUserInputs[y][x] = 1;
      stepBomb(bombMap);
      //x, yに旗、？がある時
    } else if (userInputs[y][x] >= 2) {
      return;
    } else {
      //x,yの周りにボムが一つもなかった時
      if (checkBombAround(x, y, bombMap) <= 0) {
        newBoard[y][x] = checkBombAround(x, y, bombMap);
        newUserInputs[y][x] = 1;
        directions.forEach((direction) => {
          if (
            -1 < x + direction[0] &&
            x + direction[0] < bombMap[0].length &&
            -1 < y + direction[1] &&
            y + direction[1] < bombMap.length &&
            newBoard[y + direction[1]][x + direction[0]] === -1
          ) {
            if (userInputs[y + direction[1]][x + direction[0]] === 0) {
              newBoard[y + direction[1]][x + direction[0]] = checkBombAround(
                x + direction[0],
                y + direction[1],
                bombMap,
              );
              newUserInputs[y + direction[1]][x + direction[0]] = 1;
            }
            cellOpen(x + direction[0], y + direction[1], bombMap);
          }
        });
        //x,yの周りにボムがあったとき
      } else {
        if (userInputs[y][x] === 0) {
          newBoard[y][x] = checkBombAround(x, y, bombMap);
          newUserInputs[y][x] = 1;
        }
      }
    }
    setBoard(newBoard);
    setUserInputs(newUserInputs);

    //勝利しているか判定
    if (bombMap[y][x] !== 1) {
      checkGameWin(newBoard);
    }
  };

  //ゲームリセット
  const gameReset = () => {
    //boardの初期化
    const initialBoard = Array.from({ length: boardHeight }, () =>
      Array.from({ length: boardWidth }, () => -1),
    );
    setBoard(initialBoard);

    //gameStateの初期化
    setGameState(0);

    //userInputsの初期化
    const initialInputs = Array.from({ length: boardHeight }, () =>
      Array.from({ length: boardWidth }, () => 0),
    );
    setUserInputs(initialInputs);

    //タイマーのリセット
    handleReset();

    //bombCounterの初期化
    setbombCount(bombCounter(initialInputs, bombQuantity));
  };

  //ゲームに勝利しているか判定する関数
  const checkGameWin = (board: number[][]) => {
    let count = 0;
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        if (board[i][j] === -1) {
          count++;
        }
      }
    }
    if (count <= bombQuantity) {
      // && gameState === 1
      const newUserInputs = Array.from({ length: boardHeight }, () =>
        Array.from({ length: boardWidth }, () => 1),
      );
      for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
          if (board[i][j] === -1) {
            newUserInputs[i][j] = 2;
          }
        }
      }
      setUserInputs(newUserInputs);
      setGameState(2);

      //タイマーのポーズ
      handlePause();

      //bombDisplayの更新
      setbombCount([
        <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
        <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
        <img src={d0.src} style={{ height: '100%' }} key={uuidv4()} />,
      ]);
    }
  };

  //bombを踏んだ時
  const stepBomb = (bombMap: number[][]) => {
    const newBoard = board.concat();
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        if (board[i][j] === -1 && bombMap[i][j] === 1) {
          newBoard[i][j] = 11;
        }
      }
    }
    const newUserInputs = Array.from({ length: boardHeight }, () =>
      Array.from({ length: boardWidth }, () => 1),
    );
    setUserInputs(newUserInputs);

    //タイマーのポーズ
    handlePause();

    //ゲーム状態を終了時に更新
    setGameState(3);
  };

  //右クリック時
  const onRightClick = (x: number, y: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //右クリックのメニューを非表示
    e.preventDefault();

    //タイマーの開始
    if (!isActive) {
      handleStart();
    }

    const newUserInputs = userInputs.concat();
    if (newUserInputs[y][x] === 0) {
      newUserInputs[y][x] = 2;
    } else if (newUserInputs[y][x] === 2) {
      newUserInputs[y][x] = 3;
    } else if (newUserInputs[y][x] === 3) {
      newUserInputs[y][x] = 0;
    }
    if (gameState === 1 || gameState === 0) {
      setUserInputs(newUserInputs);
      setbombCount(bombCounter(newUserInputs, bombQuantity));
    }
  };

  //ゲームの初期化
  const setGame = (height: number, width: number, bq: number) => {
    //タイマーのリセット
    handleReset();

    // //customGameの設定の非表示
    // setCustomGameState(false);

    //boardの大きさの変更
    setBoardHeight(height);
    setBoardWidth(width);
    setBombQuantity(bq);

    //bombMap ボムの位置を保存する配列
    const initialBombMap = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0),
    );
    setBombMap(initialBombMap);

    //userInputs ユーザーの入力を保存する配列
    const initialUserInputs = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0),
    );
    setUserInputs(initialUserInputs);

    //board cellの状態を保存する配列
    const initialBoard = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => -1),
    );
    setBoard(initialBoard);

    //bombCounter bombの個数を表示する
    setbombCount(() => bombCounter(initialUserInputs, bq));

    //gameState  ゲームの状況を未開始に設定
    setGameState(0);
  };

  const clickHandler = (x: number, y: number) => {
    // console.log('クリックした座標=> x:', x, 'y:', y);

    //BombMapの生成&GameStateを進行中に設定
    let newBombMap: number[][] = [];
    if (gameState === 0) {
      newBombMap = createBombMap(x, y);
      setBombMap(newBombMap);

      if (!isActive) {
        handleStart();
      }

      //GameStateをプレイ中に設定
      setGameState(1);

      //cellを開く
      cellOpen(x, y, newBombMap);
    } else if (gameState === 1) {
      //cellを開く
      cellOpen(x, y, bombMap);
    }
  };

  //カスタムゲーム設定用のState
  const [initialHeight, setInitialHeight] = useState(5);
  const [initialWidth, setInitialWidth] = useState(5);
  const [initialBombQuantity, setInitialBombQuantity] = useState(5);
  const customSizeGameRefresh = () => {
    //customGameの設定の非表示
    setCustomGameState(false);

    let newBombQuantity = initialBombQuantity;
    if (initialHeight * initialWidth <= initialBombQuantity) {
      newBombQuantity = initialHeight * initialWidth;
      setInitialBombQuantity(newBombQuantity);
    }
    let newHeight = initialHeight;
    if (initialHeight > 100) {
      newHeight = 100;
      setInitialHeight(newHeight);
    }
    let newWidth = initialWidth;
    if (initialWidth > 100) {
      newWidth = 100;
      setInitialWidth(newWidth);
    }
    setGame(newHeight, newWidth, newBombQuantity);
  };

  const customGameHandler = () => {
    setCustomGameState(true);
    setGame(initialHeight, initialWidth, initialBombQuantity);
  };
  const beginnerGameHandler = () => {
    //customGameの設定の非表示
    setCustomGameState(false);
    setGame(9, 9, 10);
  };
  const intermediateGameHandler = () => {
    //customGameの設定の非表示
    setCustomGameState(false);
    setGame(16, 16, 40);
  };
  const advancedGameHandler = () => {
    //customGameの設定の非表示
    setCustomGameState(false);
    setGame(16, 30, 99);
  };

  return (
    <div className={styles.container}>
      <div className={styles.settings}>
        <div className={styles.dificulty} style={{ display: 'flex', flexFlow: 'column' }}>
          <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
            <button className={styles.settingButton} onClick={() => beginnerGameHandler()}>
              初級
            </button>
            <button className={styles.settingButton} onClick={() => intermediateGameHandler()}>
              中級
            </button>
            <button className={styles.settingButton} onClick={() => advancedGameHandler()}>
              上級
            </button>
            <button className={styles.settingButton} onClick={() => customGameHandler()}>
              カスタム
            </button>
          </div>
          <div
            className={customGameState ? '' : styles.hidden}
            style={{ display: 'flex', flexFlow: 'column', marginTop: '1rem' }}
          >
            <div>
              <label>
                縦：
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={initialHeight}
                  onChange={(event) => setInitialHeight(parseInt(event.target.value))}
                  style={{ width: '3em' }}
                />
              </label>
              <label style={{ margin: '0 2em' }}>
                横：
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={initialWidth}
                  onChange={(event) => setInitialWidth(parseInt(event.target.value))}
                  style={{ width: '3em' }}
                />
              </label>
              <label>
                ボムの個数：
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={initialBombQuantity}
                  onChange={(event) => setInitialBombQuantity(parseInt(event.target.value))}
                  style={{ width: '3em' }}
                />
              </label>
            </div>
            <button
              style={{
                backgroundColor: '#2e2e2e',
                border: '2px solid #737373',
                color: '#e5e5e5',
                cursor: 'pointer',
                padding: '0.5rem',
                marginTop: '0.5em',
              }}
              onClick={() => customSizeGameRefresh()}
            >
              更新
            </button>
          </div>
        </div>
        <div>{customGameState}</div>
      </div>
      <div className={styles.outer} onContextMenu={(e) => e.preventDefault()}>
        <div className={styles.info} onContextMenu={(e) => e.preventDefault()}>
          <div className={styles.display}>
            <div className={styles.bombDisplay}>{bombCount}</div>
          </div>
          <div className={styles.faceButton} onClick={() => gameReset()}>
            <img
              className={
                (styles.faceButton,
                gameState === 2
                  ? styles.faceWin
                  : gameState === 3
                    ? styles.faceLose
                    : styles.faceUnplessed)
              }
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <div className={styles.display}>
            <div className={styles.timeDisplay} style={{ color: 'red' }}>
              {timeCounter(time)}
            </div>
          </div>
        </div>
        <div
          className={styles.board}
          style={{
            gridTemplateColumns: `repeat(${boardWidth}, 30px)`,
          }}
        >
          {board.map((row, y) =>
            row.map((cellType, x) => {
              if (cellType === -1) {
                //userInputsが旗,?の場合
                if (userInputs[y][x] >= 2) {
                  return (
                    <div
                      className={styles.cell}
                      key={`${x}-${y}`}
                      onClick={() => clickHandler(x, y)}
                      onContextMenu={(e) => onRightClick(x, y, e)}
                    >
                      <div
                        className={styles.flags}
                        style={{
                          backgroundPosition: `${(11 - userInputs[y][x]) * -22.4}px 0px`,
                        }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={styles.cell}
                      key={`${x}-${y}`}
                      onClick={() => clickHandler(x, y)}
                      onContextMenu={(e) => onRightClick(x, y, e)}
                    />
                  );
                }
              } else if (cellType === 0) {
                return (
                  <div
                    className={styles.open}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                );
              } else if (cellType === 10) {
                return (
                  <div
                    className={styles.spCell}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      backgroundPosition: `${10 * -30}px 0px`,
                      backgroundColor: 'red',
                      boxSizing: 'border-box',
                    }}
                  />
                );
              } else {
                return (
                  <div
                    className={styles.spCell}
                    style={{
                      backgroundPosition: `${(board[y][x] - 1) * -30}px 0px`,
                      boxSizing: 'border-box',
                    }}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(e) => e.preventDefault()}
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
