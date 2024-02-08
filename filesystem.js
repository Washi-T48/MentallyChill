const fs = require('fs');
import dotenv from 'dotenv';
dotenv.config();

class FileSystem {
    constructor(content) {
        this.path = process.env.PATH;
        this.content = content;
    }

    setPath(path) {
        this.path = path;
    }

    write(path) {
        fs.writeFileSync(path, this.content, err => {
            if (err) {
                console.error(err);
                return;
            }
        }
        );
    }
}
export default FileSystem;
