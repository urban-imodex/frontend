export interface Contact {
  contactid?: string;       // UUID
  firstname?: string;       // VARCHAR(50)
  lastname?: string;        // VARCHAR(50)
  email?: string;           // VARCHAR(100)
  phone?: string;          // VARCHAR(20)
  addr?: string;           // TEXT
  userID?: string;         // UUID
  createdat?: string;       // TIMESTAMP
}