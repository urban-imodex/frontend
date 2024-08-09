export interface Contact {
  contactid?: string;       // UUID
  firstname?: string;       // VARCHAR(50)
  lastname?: string;        // VARCHAR(50)
  email?: string;           // VARCHAR(100)
  phone?: string;          // VARCHAR(20)
  addrcounty?: string;           // TEXT
  addrtown?: string;           // TEXT
  addraddr?: string;           // TEXT
  privatenote?: string;           // TEXT
  agentid?: string;         // UUID
  orgid?: string;         // UUID
  createdat?: string;       // TIMESTAMP
}


// contactid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
// firstname VARCHAR(50) NOT NULL,
// lastname VARCHAR(50) NOT NULL,
// email VARCHAR(100),
// phone VARCHAR(20),
// addrcounty TEXT,
// addrtown TEXT,
// addraddr TEXT,
// privatenote TEXT,    
// agentid UUID DEFAULT request.sub()::uuid,
// orgid UUID NOT NULL,
// createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,