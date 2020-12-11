import Util from './Util'

interface ReadDirAndFile {
  exists  : Boolean;
  content : any;
}

class Storage extends Util {

  readDir(path: String, encoding: { encoding: "ascii"   }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "utf8"    }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "utf16le" }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "utf-8"   }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "ucs2"    }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "ucs-2"   }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "base64"  }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "latin1"  }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "binary"  }): ReadDirAndFile;
  readDir(path: String, encoding: { encoding: "hex"     }): ReadDirAndFile;

  readFile(path: String, encoding: { encoding: "ascii"   }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "utf8"    }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "utf16le" }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "utf-8"   }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "ucs2"    }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "ucs-2"   }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "base64"  }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "latin1"  }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "binary"  }): ReadDirAndFile;
  readFile(path: String, encoding: { encoding: "hex"     }): ReadDirAndFile;
}

export = Storage;