import React, { memo } from 'react';
import { IImageConfig } from './schema';
import logo from '@/assets/06-图片组件.png';
const SelfImage = memo((props: IImageConfig) => {
  const {
    imgUrl,
    round = 0,
    translate,
    align,
    titText,
    titFontSize,
    titColor,
    titFontWeight,
    subTitText,
    subTitFontSize,
    subTitColor,
    subTitFontWeight,
  } = props;
  return (
    <>
      {props.isTpl && (
        <div>
          <img src={logo} alt="" />
        </div>
      )}
      {!props.isTpl && (
        <div
          style={{
            overflow: 'hidden',
            position: 'absolute',
            width: `${props.baseWidth}%`,
            height: `${props.baseHeight}%`,
            borderRadius: props.baseRadius,
            transform: `translate(${props.baseLeft}px,${props.baseTop}px) 
      scale(${props.baseScale / 100}) 
      rotate(${props.baseRotate}deg)`,
          }}
        >
          <div
            style={{
              borderRadius: round,
              width: '100%',
              textAlign: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                marginLeft: translate && translate[0],
                marginTop: translate && translate[1],
                textAlign: align,
              }}
            >
              <div style={{ fontSize: titFontSize, color: titColor, fontWeight: +titFontWeight }}>
                {titText}
              </div>
              <div
                style={{
                  fontSize: subTitFontSize,
                  color: subTitColor,
                  fontWeight: +subTitFontWeight,
                  lineHeight: 2.6,
                }}
              >
                {subTitText}
              </div>
            </div>
            <img
              src={imgUrl && imgUrl[0].url}
              alt=""
              style={{ padding: 0, border: 0, marginTop: 0, width: '100%', height: '100%' }}
            />
            {/* <img src={imgUrl} alt="" style={{ width: '100%' }} /> */}
          </div>
        </div>
      )}
    </>
  );
});

export default SelfImage;
