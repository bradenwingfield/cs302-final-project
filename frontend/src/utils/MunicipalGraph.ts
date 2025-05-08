import { Municipal } from '../types/municipal';

// Node class
class GraphNode {
    municipal: Municipal;
    adjacentNodes: Map<string, number>; // Map of municipal ID to edge weight (similarity score)

    constructor(municipal: Municipal) {
        this.municipal = municipal;
        this.adjacentNodes = new Map();
    }

    // Calculate relevance score for a query
    calculateRelevance(query: string): number {
        const queryWords = new Set(query.toLowerCase().split(/\s+/));
        const text = `${this.municipal.title} ${this.municipal.summary}`.toLowerCase();
        const textWords = new Set(text.split(/\s+/));

        // Calculate word overlap
        let overlap = 0;
        queryWords.forEach(word => {
            if (textWords.has(word)) {
                overlap++;
            }
        });

        // Calculate word frequency in the document
        const wordFrequency = new Map<string, number>();
        text.split(/\s+/).forEach(word => {
            wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
        });

        // Calculate weighted score based on word frequency
        let weightedScore = 0;
        queryWords.forEach(word => {
            if (wordFrequency.has(word)) {
                weightedScore += wordFrequency.get(word)!;
            }
        });

        // Combine scores with weights
        return (overlap * 0.6) + (weightedScore * 0.4);
    }
}

// Graph class
export class MunicipalGraph {
    private nodes: Map<string, GraphNode>;
    
    constructor() {
        this.nodes = new Map();
    }

    // Add a municipal code to the graph
    addNode(municipal: Municipal) {
        if (!this.nodes.has(municipal._id)) {
            this.nodes.set(municipal._id, new GraphNode(municipal));
        }
    }

    // Build edges between related nodes
    buildEdges() {
        const nodeArray = Array.from(this.nodes.values());
        
        // Using selection sort pattern to find most similar nodes
        for (let i = 0; i < nodeArray.length; i++) {
            const current = nodeArray[i];
            
            for (let j = i + 1; j < nodeArray.length; j++) {
                const other = nodeArray[j];
                
                // Calculate similarity based on word overlap and frequency
                const similarity = this.calculateNodeSimilarity(current, other);

                // Only create edges for sufficiently similar nodes
                if (similarity > 0.2) {
                    current.adjacentNodes.set(other.municipal._id, similarity);
                    other.adjacentNodes.set(current.municipal._id, similarity);
                }
            }
        }
    }

    // Calculate similarity between two nodes
    private calculateNodeSimilarity(node1: GraphNode, node2: GraphNode): number {
        const text1 = `${node1.municipal.title} ${node1.municipal.summary}`.toLowerCase();
        const text2 = `${node2.municipal.title} ${node2.municipal.summary}`.toLowerCase();
        
        // Calculate word overlap
        const words1 = new Set(text1.split(/\s+/));
        const words2 = new Set(text2.split(/\s+/));
        
        let overlap = 0;
        words1.forEach(word => {
            if (words2.has(word)) {
                overlap++;
            }
        });

        // Calculate word frequency in both documents
        const freq1 = new Map<string, number>();
        const freq2 = new Map<string, number>();
        
        text1.split(/\s+/).forEach(word => {
            freq1.set(word, (freq1.get(word) || 0) + 1);
        });
        
        text2.split(/\s+/).forEach(word => {
            freq2.set(word, (freq2.get(word) || 0) + 1);
        });

        // Calculate weighted similarity based on word frequency
        let weightedSimilarity = 0;
        words1.forEach(word => {
            if (words2.has(word)) {
                weightedSimilarity += Math.min(freq1.get(word)!, freq2.get(word)!);
            }
        });

        return (overlap * 0.6) + (weightedSimilarity * 0.4);
    }

    // Find relevant codes using BFS and quick sort
    findRelevantCodes(query: string, limit: number = 4): Municipal[] {
        const results: { municipal: Municipal; score: number }[] = [];

        // Calculate initial relevance scores
        this.nodes.forEach((node) => {
            const score = node.calculateRelevance(query);
            if (score > 0) {
                results.push({ municipal: node.municipal, score });
            }
        });

        // Quick sort implementation for sorting by relevance
        const quickSort = (arr: typeof results, low: number, high: number) => {
            if (low < high) {
                const pivot = arr[high].score;
                let i = low - 1;

                for (let j = low; j < high; j++) {
                    if (arr[j].score > pivot) {
                        i++;
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                return i + 1;
            }
            return low;
        };

        const partition = (arr: typeof results, low: number, high: number) => {
            if (low < high) {
                const pi = quickSort(arr, low, high);
                partition(arr, low, pi - 1);
                partition(arr, pi + 1, high);
            }
        };

        // Sort results by relevance
        partition(results, 0, results.length - 1);

        // Get top matches
        const topMatches = results.slice(0, limit);
        const relatedCodes = new Set<Municipal>();

        // Use BFS to find related codes for each top match
        topMatches.forEach(({ municipal }) => {
            const node = this.nodes.get(municipal._id);
            if (node) {
                // Sort adjacent nodes by weight and get top 2
                const sortedAdjacent = Array.from(node.adjacentNodes.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 2);

                sortedAdjacent.forEach(([id]) => {
                    const relatedNode = this.nodes.get(id);
                    if (relatedNode) {
                        // Only add if it's relevant to the query
                        if (relatedNode.calculateRelevance(query) > 0.2) {
                            relatedCodes.add(relatedNode.municipal);
                        }
                    }
                });
            }
        });

        // Combine top matches with related codes
        return [...topMatches.map(r => r.municipal), ...Array.from(relatedCodes)]
            .slice(0, limit);
    }
} 