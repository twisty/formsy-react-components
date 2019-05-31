interface ClassDictionary {
  [id: string]: any;
}

// JedWatson/classnames
// --------------------
//
// This is a PropType definition that is suitable for converting to a HTML 'class' attribute value.
// See: https://github.com/JedWatson/classnames
export type ClassNamesType = string | ClassDictionary | string[] | object;
