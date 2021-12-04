import React from "react";
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';
const SLOW_SPEED = 150;
const MEDIUM_SPEED = 30;
const FAST_SPEED = 5;
let ANIMATION_SPEED_MS = MEDIUM_SPEED;
const NUMBER_OF_ARRAY_BARS = 50;
const PRIMARY_COLOR = 'rgb(13, 65, 59)';
const SECONDARY_COLOR = 'red';
const PIVOT_COLOR = 'chartreuse';
const MIN_HEIGHT = 10;
const MAX_HEIGHT = 400;
const width = 1000;
const barWidth = Math.floor(width/NUMBER_OF_ARRAY_BARS) - 1;
export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i=0;i<NUMBER_OF_ARRAY_BARS;i++){
            array.push(randomIntFromInterval(MIN_HEIGHT,MAX_HEIGHT));
            // array.push(10);
        }
        this.setState({array});
    }
    
    mergeSort() {
        const animations = sortingAlgorithms.mergeSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
          const isColorChange = i % 3 !== 1;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    quickSort() {
        const animations = sortingAlgorithms.quickSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let timer = 0;
        for(const partition of animations){
            const barPivotIdx = partition[0][0];
            const barPivotStyle = arrayBars[barPivotIdx].style;

            for(let i=1;i<partition.length;i++){
                const [barOneIdx, barTwoIdx] = partition[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    barPivotStyle.backgroundColor = PIVOT_COLOR;
                },timer++*ANIMATION_SPEED_MS);
                setTimeout(() => {
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                },timer++*ANIMATION_SPEED_MS);
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    barPivotStyle.backgroundColor = PIVOT_COLOR;
                },timer++*ANIMATION_SPEED_MS);
            }
            setTimeout(() => {
                barPivotStyle.backgroundColor = PRIMARY_COLOR;
            },timer++*ANIMATION_SPEED_MS);
        }
    }

    selectionSort() {
        const animations = sortingAlgorithms.selectionSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let i = 0;
        for(const animation of animations){
            const [barOneIdx, barTwoIdx] = animation;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            },i++*ANIMATION_SPEED_MS);
            setTimeout(() => {
                const temp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = temp;
            },i++*ANIMATION_SPEED_MS);
            setTimeout(() => {
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;
            },i++*ANIMATION_SPEED_MS);
        }
    }

    bubbleSort() {
        const animations = sortingAlgorithms.bubbleSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let i = 0;
        for(const animation of animations){
            const [barOneIdx, barTwoIdx] = animation;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            },i++*ANIMATION_SPEED_MS);
            setTimeout(() => {
                const temp = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = temp;
            },i++*ANIMATION_SPEED_MS);
            setTimeout(() => {
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;
            },i++*ANIMATION_SPEED_MS);
        }
    }
    
    reload(){
        window.location.reload();
    }

    speedSlow(){
        ANIMATION_SPEED_MS = SLOW_SPEED;
        const slow = document.getElementById('slow');
        const medium = document.getElementById('medium');
        const fast = document.getElementById('fast');
        slow.style.backgroundColor = 'red'
        medium.style.backgroundColor = 'rgb(56, 15, 15)';
        fast.style.backgroundColor = 'rgb(56, 15, 15)';
    }
    speedMedium(){
        ANIMATION_SPEED_MS = MEDIUM_SPEED;
        const slow = document.getElementById('slow');
        const medium = document.getElementById('medium');
        const fast = document.getElementById('fast');
        slow.style.backgroundColor = 'rgb(56, 15, 15)'
        medium.style.backgroundColor = 'red';
        fast.style.backgroundColor = 'rgb(56, 15, 15)';
    }
    speedFast(){
        ANIMATION_SPEED_MS = FAST_SPEED;
        const slow = document.getElementById('slow');
        const medium = document.getElementById('medium');
        const fast = document.getElementById('fast');
        slow.style.backgroundColor = 'rgb(56, 15, 15)'
        medium.style.backgroundColor = 'rgb(56, 15, 15)';
        fast.style.backgroundColor = 'red';
    }

    render() {
        const {array} = this.state;
        
        return (
            <div className="array-container">
                <button class="loading" onClick={() => this.resetArray()}>Generate New Array</button>
                <button class="loading" onClick={() => this.reload()}>Reload</button>
                <br/>
                <p>Type:</p>
                <button class="sorts" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button class="sorts" onClick={() => this.quickSort()}>Quick Sort</button>
                <button class="sorts" onClick={() => this.selectionSort()}>Selection Sort</button>
                <button class="sorts" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <br/>
                <p>Speed:</p>
                <button class="speed" id="slow" onClick={() => this.speedSlow()}>Slow</button>
                <button class="speed" id="medium" onClick={() => this.speedMedium()}>Medium</button>
                <button class="speed" id="fast" onClick={() => this.speedFast()}>Fast</button>
                <br/>
                {array.map((value,idx) => (
                    <div 
                        className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`, width: `${barWidth}px`}} >
                            &nbsp;
                    </div>
                ))}
            </div>
        );
    }
}

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}
