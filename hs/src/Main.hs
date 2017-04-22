{-# LANGUAGE OverloadedStrings #-}
module Main where

import Web.Scotty
import Data.Aeson

main = do
  putStrLn "starting server"
  scotty 3000 $ do
    get "/caw/:caw_count" $ do
      count <- param "caw_count"
      Web.Scotty.json (object [ "noises" .= (replicate count payload)]) where
        payload = "caw" :: String
