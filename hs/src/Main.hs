{-# LANGUAGE OverloadedStrings #-}
module Main where

import Web.Scotty
import Data.Aeson (object, (.=))

main = do
  putStrLn "starting server"
  scotty 3000 $ do
    get "/caw/:caw_count" $ do
      count <- param "caw_count"
      json (object [ "noises" .= (replicate count payload)])
      where
        payload = "caw" :: String
