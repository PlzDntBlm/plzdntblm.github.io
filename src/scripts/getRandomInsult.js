export async function getRandomInsult() {
    try {
        const response = await fetch('/src/text/insults.txt');
        const data = await response.text();
        const answers = data.split('\n').filter(answer => answer.trim() !== '');
        const randomIndex = Math.floor(Math.random() * answers.length);
        return answers[randomIndex];
    } catch (error) {
        console.error('Error:', error);
    }
}