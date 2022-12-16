import fs from 'fs';
import * as Canvas from 'canvas';
import { colord } from 'colord';
import path from 'path';

import { formatDuration } from '../f.js';
import { progressBar } from './ctxProgressBar.js';
import colors from '../colors.js';

const fontPath = path.join(process.cwd(), '/assets/VarelaRound-Regular.ttf');

Canvas.registerFont(fontPath, { family: 'VarelaRound' });

interface BarOptions {
  currentTime: number;
  totalTime: number;
  isCurrentSong: boolean;
  isPaused: boolean;
  isLive: boolean;
  position: number;
  fileOutput?: string;
  forceCustomText?: string;
}

export function bar(options: BarOptions) {
  const { currentTime, totalTime, isCurrentSong, isPaused, isLive, position, fileOutput, forceCustomText } = options;

  // Vars
  const d = 1.3;
  const size = 600;
  const width = (size * 0.9) / d;
  const height = size / 10 / d;

  const fontSize = height * 0.4;

  // Initiate the canvas
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create the gradients needed
  const col = {
    _1: colors.info,
    _2: colors.ok,
    _3: colors.wait,
    _4: colors.error
  };

  let fillGradient = ctx.createLinearGradient(0, 0, width, height);
  fillGradient.addColorStop(0, col._1);
  fillGradient.addColorStop(0.4, col._2);
  fillGradient.addColorStop(0.6, col._3);
  fillGradient.addColorStop(1, col._4);

  let dark = 0.3;
  let desat = 0.5;

  let emptyGradient = ctx.createLinearGradient(0, 0, width, height);
  emptyGradient.addColorStop(0, colord(col._1).darken(dark).desaturate(desat).toHex());
  emptyGradient.addColorStop(0.4, colord(col._2).darken(dark).desaturate(desat).toHex());
  emptyGradient.addColorStop(0.6, colord(col._3).darken(dark).desaturate(desat).toHex());
  emptyGradient.addColorStop(1, colord(col._4).darken(dark).desaturate(desat).toHex());

  // Paint the background
  let barState: string;
  if (!isCurrentSong || (isCurrentSong && isLive)) {
    // It's not the current song or it's current and it's live, full bar
    progressBar(ctx, 100, 100, 0, 10, width, height - 20, fillGradient, emptyGradient);
    barState = 'full';
  } else {
    // It's the current song, not live, partially filled bar
    progressBar(ctx, currentTime, totalTime, 0, 10, width, height - 20, fillGradient, emptyGradient);
    barState = currentTime === 0 ? 'empty' : currentTime === totalTime ? 'full' : 'partial';
  }

  // Text styling
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.font = `700 ${fontSize}px VarelaRound`;
  ctx.lineWidth = 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // e.g. "02:08 / 07:36 - 05:28 left"
  const formattedTime = `${formatDuration(currentTime)} / ${formatDuration(totalTime)} - ${formatDuration(totalTime - currentTime)} left`;

  // Compose the string that's going to be written
  let str = isCurrentSong ? (isLive ? '- LIVE -' : formattedTime) + (isPaused ? ' (Paused)' : '') : position === 1 ? 'Playing next...' : `Waiting for ${position} songs to play...`;
  let testStr = isCurrentSong ? (isLive ? 'live' : 'time') + (isPaused ? 'paused' : '') : position === 1 ? 'next' : `waiting for ${position}`;

  if (forceCustomText) {
    str = forceCustomText;
    testStr = forceCustomText;
  }

  // Text location and maxWidth
  const offset = height / 20;
  const x = width / 2;
  const y = (height + fontSize / 4) / 2 - offset;
  const w = width - 10;

  // Writing the text
  ctx.fillText(str, x, y, w);
  ctx.strokeText(str, x, y, w);

  // Get the buffer
  const buffer = canvas.toBuffer('image/png');

  if (fileOutput) {
    // and output it to a file if specified
    fs.writeFileSync(`./${fileOutput}.png`, buffer);
  }

  // then return final product
  return {
    buffer: buffer,
    test: {
      barState: barState,
      str: testStr,
      fullStr: str
    }
  };
}

// I don't remember what this does so I'm keeping it here as a comment
/*
const leftStr = formatDuration(currentTime);
const rightStr = formatDuration(totalTime);
const midStr = `${formatDuration(totalTime - currentTime)} left`;

ctx.textAlign = "left";
ctx.fillText(leftStr, 16, Math.floor((height / 2) + (fontSize / 2) - 4));
ctx.strokeText(leftStr, 16, Math.floor((height / 2) + (fontSize / 2) - 4));

ctx.textAlign = "right";
ctx.fillText(rightStr, width - 16, Math.floor((height / 2) + (fontSize / 2) - 4));
ctx.strokeText(rightStr, width - 16, Math.floor((height / 2) + (fontSize / 2) - 4));

ctx.textAlign = "center";
ctx.fillText(midStr, width / 2, Math.floor((height / 2) + (fontSize / 2) - 4));
ctx.strokeText(midStr, width / 2, Math.floor((height / 2) + (fontSize / 2) - 4));
*/

//ctx.fillText(str, (width - 20) / 2, Math.floor((height / 2) + (fontSize / 2) - 4));
//ctx.strokeText(str, (width - 20) / 2, Math.floor((height / 2) + (fontSize / 2) - 4));
