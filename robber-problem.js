const robberSpeed = Math.floor(Math.random() * 10);
let mineExplodingPositionGrowthSpeed = Math.floor(Math.random() * 10);
console.log(`The robber moves at speed ${robberSpeed}`);

for (let time = 0; time < 1000; time++) {
    const robberPosition = robberSpeed * time;
    const mineExplodingPosition = mineExplodingPositionGrowthSpeed * Math.floor((Math.cos(time) + 1));
    console.log(`The mine explodes at position ${mineExplodingPosition} and the robber is at position ${robberPosition} at time ${time}`);
    if (robberPosition === mineExplodingPosition) {
        console.log(`The robber has been exploded at time ${time}`);
        break;
    }
}