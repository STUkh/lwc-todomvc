export class SampleWireAdapter {
    constructor(callback) { 
        this.connected = false;
        this.callback = callback;
    }
    connect() {
        this.connected = true;
    }
    disconnect() {
        this.connected = false;
    }
    update() {
        if(this.connected) {
            this.callback();
        }
    }
}

export const getMockWireAdapter = (dataFetcher) => {
    class MockWireAdapter extends SampleWireAdapter {
        constructor(...props) {
            super(...props);
        }
        async update(config) {
            if(this.connected) {
                try {
                    const data = await dataFetcher(config);
                    this.callback({ data });
                } catch (error) {
                    this.callback({ error });
                }
            }
        }
    }

    return MockWireAdapter;
};
