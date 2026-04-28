const robberStartPoint = Math.floor(Math.random() * 100);
const robberSpeed = Math.floor(Math.random() * 10);
let mineExplodingPositionGrowthSpeed = Math.floor(Math.random() * 10);
console.log(`The robber starts at position ${robberStartPoint} and moves at speed ${robberSpeed}`);

for (let time = 0; time < 100; time++) {
    const robberPosition = robberStartPoint + robberSpeed * time;
    const mineExplodingPosition = mineExplodingPositionGrowthSpeed * Math.floor(100*(Math.sin(time) + 1));
    console.log(`The mine explodes at position ${mineExplodingPosition} and the robber is at position ${robberPosition} at time ${time}`);
    if (robberPosition === mineExplodingPosition) {
        console.log(`The robber has been exploded at time ${time}`);
        break;
    }
}