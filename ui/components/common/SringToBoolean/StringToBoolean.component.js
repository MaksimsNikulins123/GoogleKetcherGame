export function stringToBoolean(str) {
        if (typeof str === "string" && str === 'true') {
            return true;
        }
        return false;
    }