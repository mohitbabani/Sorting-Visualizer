export const selectionSort = array => {
    const ans = [];
    for(let i=0;i<array.length;i++){
        let min_idx = i;
        for(let j=i+1;j<array.length;j++){
            if(array[j] < array[min_idx]){
              min_idx = j;
            }
        }
        ans.push([i,min_idx]);
        [array[i],array[min_idx]] = [array[min_idx],array[i]];
    }
    return ans;
}
export const bubbleSort = array => {
  const ans = [];
  for(let i=0;i<array.length-1;i++){
      for(let j=0;j<array.length-i-1;j++){
          if(array[j] > array[j+1]){
              [array[j],array[j+1]] = [array[j+1],array[j]];
              ans.push([j,j+1]);
          }
      }
  }
  return ans;
}
export const mergeSort = array => {
  const animations = [];
  if (array.length <= 1) return array;
  mergeSortHelper(array, 0, array.length - 1, animations);
  return animations;
}
export const quickSort = array => {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(
  array,
  startIdx,
  endIdx,
  animations
) {
  if(startIdx >= endIdx) return;
  const pi = partition(array,startIdx,endIdx,animations);
  quickSortHelper(array,startIdx,pi-1,animations);
  quickSortHelper(array,pi+1,endIdx,animations); 
}

function partition(
  array,
  startIdx,
  endIdx,
  animations
){
  const temp = [];
  temp.push([endIdx,endIdx]);
  const pivot = array[endIdx];
  let i = startIdx;
  for(let j=startIdx;j<endIdx;j++){
    if(array[j] < pivot){
      [array[j],array[i]] = [array[i],array[j]];
      temp.push([i,j]);
      i++;
    }
  }
  [array[i],array[endIdx]] = [array[endIdx],array[i]];
  temp.push([i,endIdx]);
  animations.push(temp);
  return i;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(mainArray, startIdx, middleIdx, animations);
  mergeSortHelper(mainArray, middleIdx + 1, endIdx, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, animations);
}
  
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  animations,
) {
  const auxiliaryArray = mainArray.slice();
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      animations.push([i, j]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      animations.push([i, j]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    animations.push([i, i]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    animations.push([j, j]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}