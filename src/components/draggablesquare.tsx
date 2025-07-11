// 実際interactjsを適用するコンポーネント（htmlcssで四角のdivを対象にするだけ）
import React, { useState, useEffect, useRef } from "react";
import interact from "interactjs";

const DraggableSquare = ({id, color}) => {
    const squareRef = useRef(null);

    // 色を記録
    const [squareColor,setSquareColor] = useState();
    // 移動位置を記録
    const [position, setPosition] = useState({x: 0, y: 0});
    // サイズを記録
    const [size, setSize] = useState({width: 100, height: 100});

  useEffect(() => {
    // squareRef.currentが!(false)のとき、処理を終了する
    if (!squareRef.current) {
      return;
    }
    setSquareColor(color);

    // interactjsの処理
    interact(squareRef.current)
    .draggable({ //ドラッグ時の設定
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
      autoScroll: true,
      onmove: dragMoveListener,
    })
    .resizable({ //サイズ変更の設定
        edges: { left: true, right: true, bottom: true, top: true },
        onmove: resizeListener,
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
              outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
              min: { width: 100, height: 50 }
          })
        ]
    });
  }, []);

  // ドラッグ時のリスナー
  const dragMoveListener = (event) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = "translate(" + x + "px, " + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    setPosition((oldPosition) => ({
        x: oldPosition.x + event.dx,
        y: oldPosition.y + event.dy,
    }));
  };

    // サイズ変更時のリスナー
  const resizeListener = (event) => {
    const target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
    setSize((oldSize) => ({
        width: oldSize.width + event.deltaRect.width,
        height: oldSize.height + event.deltaRect.height,
    }));
  }

  // 各情報を適用したdivを返す
  return <div id={id} ref={squareRef} style={{ width: size.width, height: size.height, backgroundColor: squareColor, position: "absolute", transform: `translate(x:${position.x},y:${position.y})`}} />;
};



export default DraggableSquare;
