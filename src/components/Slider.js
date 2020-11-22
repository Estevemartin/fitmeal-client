import React from 'react'
// import { Link } from 'react-router-dom'
import DragScrollProvider from 'drag-scroll-provider'
import CategoryCard from './CategoryCard'
// import imgbreakfast from './img/avocado-toast-with-egg.jpeg'
const slider = () => {

    return (
        <DragScrollProvider horizonal='true'>
            {({ onMouseDown, ref }) => (
                <div className="scrollable" ref={ref} onMouseDown={onMouseDown}>
                    <CategoryCard category="breakfast" imageUrl='./img/avocado-toast-with-egg.jpeg' />
                    <CategoryCard category="brunch" imageUrl="./img/banana-oatmeal-pancakes.jpeg"/>
                    <CategoryCard category="lunch" imageUrl="./img/creamy-roasted-pumpkin-soup.jpeg"/>
                    <CategoryCard category="snack" imageUrl="./img/goat-cheese-salad-nuts.jpeg"/>
                    <CategoryCard category="dinner" imageUrl="./img/guacamole.jpeg"/>
                </div>
            )}
        </DragScrollProvider>
    )
}

export default slider